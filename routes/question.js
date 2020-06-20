const express = require("express");

const router = express.Router();
const passport = require("passport");
const Question = require("../models/question");

const questionController = require("../controller/question-controller");

router.post("/create", passport.checkAuthentication, questionController.create);

module.exports = router;
