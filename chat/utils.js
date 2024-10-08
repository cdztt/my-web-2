const path = require("node:path");
const { readFileSync } = require("node:fs");
const { randomInt } = require("node:crypto");

function getTls(mode) {
  let tls;
  if (mode === "dev") {
    tls = {
      key: readFileSync(
        path.join(__dirname, "./env/localhost/localhost-key.pem"),
      ),
      cert: readFileSync(path.join(__dirname, "./env/localhost/localhost.pem")),
    };
  } else if (mode === "prod") {
    tls = {
      pfx: readFileSync(
        path.join(__dirname, "./env/cdztt.cn_iis/cdztt.cn.pfx"),
      ),
      passphrase: readFileSync(
        path.join(__dirname, "./env/cdztt.cn_iis/keystorePass.txt"),
        "utf8",
      ),
    };
  }

  return tls;
}

function getUuid(size) {
  function getRandomLetter() {
    return String.fromCharCode(randomInt(97, 123));
  }

  let uuid = "";
  for (let i = 0; i < size; i++) {
    uuid += getRandomLetter();
  }

  return uuid;
}

function parseCookie(rawCookie) {
  return Object.fromEntries(
    rawCookie.split(";").map((el) => el.trim().split("=")),
  );
}

function parseBodyToStr(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      resolve(body);
    });
  });
}

const BASE = `/${path.basename(__dirname)}`;

module.exports = {
  getTls,
  getUuid,
  parseCookie,
  parseBodyToStr,
  BASE,
};
