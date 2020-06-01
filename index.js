const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
const flash = require("connect-flash");
const customMWare = require("./config/middleware");

app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.set("views", "./views");
app.use(
  session({
    name: "authentication",
    secret: "secretKey",
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
