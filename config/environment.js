const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "secretKey",
  db: "QuoraDataBase",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "vishavgupta6023@gmail.com",
      pass: "gupta6023@vishavgupta",
    },
  },
  google_client_iD:
    "23773391472-kgq0iddsv0d1nsolh7dua63jkgbr910p.apps.googleusercontent.com",
  google_client_secret: "02ri5tbN23dn_jujV18lu-rN",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.QUORA_ASSET_PATH,
  session_cookie_key: process.env.QUORA_SESSION_COOKIE_KEY,
  db: process.env.QUORA_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.QUORA_GMAIL_USERNAME,
      pass: process.env.QUORA_GMAIL_PASSWORD,
    },
  },
  google_client_iD: process.env.QUORA_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.QUORA_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.QUORA_GOOGLE_CALLBACK_URL,
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.QUORA_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.QUORA_ENVIRONMENT);
