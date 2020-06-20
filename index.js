const express = require("express");
const env = require("./config/environment");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const session = require("express-session");
const flash = require("connect-flash");
const customMWare = require("./config/middleware");

//setup the chat server to be used with sockets.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(express.static(env.asset_path));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.set("views", "./views");
app.use(
  session({
    name: "authentication",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMWare.setFlash);
app.use("/", require("./routes"));

console.log(process.env.QUORA_ASSET_PATH, "QUORA_ASSET_PATH");

app.listen(port, function () {
  console.log("The server is running succesfully");
});
