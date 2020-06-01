const express = require("express");
const router = express.Router();
const passport = require("passport");

const answerController = require("../controller/answer_controller");
router.post(
  "/create",
  passport.checkAuthentication,
  answerController.addAnswer
);

module.exports = router;
