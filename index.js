const express = require("express");
const env = require("./config/environment");
const logger = require("morgan");

const app = express();
require("./config/view-helpers")(app);
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const session = require("express-session");
const flash = require("connect-flash");
const customMWare = require("./config/middleware");
console.log("APP LOCALS ASSET PATH ");

//setup the chat server to be used with sockets.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode, env.morgan.options));

app.set("views", "./views");
console.log("SESSION COOKIE KEY", env.session_cookie_key);
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

app.listen(port, function () {
  console.log("The server is running succesfully");
});
