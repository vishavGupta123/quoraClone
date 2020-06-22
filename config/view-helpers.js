const env = require("./environment");
const fs = require("fs");
const path = require("path");

console.log("ENVIRONMENT NAME ", env.name);

module.exports = (app) => {
  console.log("I AM APP ", app);

  app.locals.assetPath = function (filePath) {
    console.log("THIS IS THE FILEPATH ", filePath);
    if (env.name == "development") {
      console.log("In the development if statement");
      return filePath;
    }

    console.log("AFTER THE DEVELOPMENT");

    return (
      "/" +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "../public/assets/rev-manifest.json")
        )
      )[filePath]
    );
  };
};
