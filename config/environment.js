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
};

const production = {
  name: "production",
};

module.exports = development;
