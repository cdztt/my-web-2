const { env } = require('node:process');
const { join } = require('node:path');
const { readFile, stat } = require('node:fs/promises');
const { parseCookie, parseBodyToStr, BASE } = require('./chat/utils.js');
const { userNames } = require('./chat/store.js');

/* 渲染html */
async function render(url, res, payload) {
  let html = await readFile(join(__dirname, url + '.html'), {
    encoding: 'utf8',
  });

  if (env.NODE_ENV === 'prod') {
    html = html.replace('vue.esm-browser.js', 'vue.esm-browser.prod.js');
  }

  // 把服务端变量传给客户端
  if (payload) {
    const injectedScript = `
<script>
  window.base='${BASE}'
  window.env='${payload['window.env']}'
  window.protocol='${payload['window.protocol']}'
  window.userName='${payload['window.userName']}'
  window.nickName='${payload['window.nickName']}'
</script>
`;
    html = html.replace('</body>', `${injectedScript}</body>`);
  }

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  });
  res.end(html);
}

/* 路由 */
async function onRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let {
    url,
    headers: { cookie },
  } = req;
  const initUserName = cookie ? parseCookie(cookie).userName : '';
  const assetType = /.(?<ext>js|css|png)$/.exec(url)?.groups?.ext;

  if (assetType) {
    const mime = {
      js: 'text/javascript',
      css: 'text/css',
      png: 'image/png',
    };
    let filePath = join(__dirname, url);

    try {
      await stat(filePath);
    } catch {
      filePath = join(__dirname, 'dist', url);
    }

    try {
      const content = await readFile(filePath);
      res.writeHead(200, {
        'Content-Type': `${mime[assetType]}; charset=utf-8`,
      });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end();
    }
  } else if (/^\/?$/.test(url)) {
    render('/dist/index', res);
  } else if (new RegExp(`^${BASE}/?$`).test(url)) {
    const { userName, nickName } = userNames.register(initUserName);
    const payload = {
      ['window.env']: env.NODE_ENV,
      ['window.protocol']: env.NODE_PROTOCOL,
      ['window.userName']: userName,
      ['window.nickName']: nickName,
    };
    render(`${BASE}/index`, res, payload);
  } else if (new RegExp(`^${BASE}/register/?$`).test(url)) {
    if (initUserName === '') {
      render(url, res, {});
    } else {
      // chat登录之后绝不能再进入register页面，手动在地址栏写入网址也不行
      res.writeHead(307, { Location: `${BASE}` });
      res.end();
    }
  } else if (new RegExp(`^${BASE}/api/register$`).test(url)) {
    // chat登录页的"确定"按钮调用此
    parseBodyToStr(req).then((input) => {
      const { ok, errMsg, userName, nickName } = userNames.register(
        initUserName,
        input
      );
      res.setHeader('Set-Cookie', [
        `userName=${userName}; HttpOnly; Path=/chat; SameSite=Strict`,
      ]);
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end(
        ok
          ? `登录成功, 你的名字: ${nickName}${
              nickName === userName ? ' (自动生成) ' : ''
            }`
          : `失败 (${errMsg})`
      );
    });
  } else if (new RegExp(`^${BASE}/api/offline$`).test(url)) {
    userNames.removeOnlineUser(initUserName);
    res.writeHead(200);
    res.end();
  } else if (new RegExp(`^${BASE}/api/logout$`).test(url)) {
    // chat页的"退出"按钮调用此
    userNames.removeOnlineUser(initUserName);
    userNames.returnUserName(initUserName);
    const userName = '';
    res.setHeader('Set-Cookie', [
      `userName=${userName}; HttpOnly; Path=/chat; SameSite=Strict`,
    ]);
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
}

module.exports = {
  onRequest,
};
