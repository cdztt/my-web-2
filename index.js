const http = require('node:http');
const https = require('node:https');
const { env } = require('node:process');
const { WebSocketServer } = require('ws');
const { onRequest } = require('./route.js');
const { getTls, BASE, parseCookie } = require('./chat/utils.js');
const { userNames } = require('./chat/store.js');

let server;
let PORT;

if (env.NODE_PROTOCOL === 'http') {
  server = http.createServer({ insecureHTTPParser: true }, onRequest);
  PORT = 80;
} else {
  server = https.createServer(getTls(env.NODE_ENV), onRequest);
  PORT = 443;
}

const wss = new WebSocketServer({
  server,
  path: `${BASE}/chat`,
  clientTracking: true,
});

wss.on('connection', (ws, req) => {
  const cookie = req.headers.cookie;
  const userName = cookie ? parseCookie(cookie).userName : '';

  ws.on('message', (msg) => {
    const { type, ...content } = JSON.parse(msg.toString());

    if (type === 'dialog') {
      [...wss.clients].forEach((ws) => ws.send(JSON.stringify(content)));
    } else if (type === 'state') {
      const onlineUsers = userNames.getOnlineUsersUsingNickName();
      const state = {
        onlineUsers,
      };
      [...wss.clients].forEach((ws) => ws.send(JSON.stringify(state)));
    }
  });

  ws.on('close', () => {
    // 防止客户端浏览器非正常关闭如崩溃，导致未执行beforeunload事件处理，在服务端确保
    userNames.removeOnlineUser(userName);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
