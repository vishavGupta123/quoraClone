const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/QuoraDataBase");
const db = mongoose.connection;
db.on("error", console.error.bind("error in connecting to the database"));
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;
