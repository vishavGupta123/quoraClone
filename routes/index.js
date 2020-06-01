const express = require("express");
const router = express.Router();
const homeController = require("../controller/home_controller");

router.get("/", homeController.home);
router.use("/users", require("./user"));
router.use("/question", require("./question"));
router.use("/answer", require("./answer"));
router.use("/like", require("./likes"));
module.exports = router;
