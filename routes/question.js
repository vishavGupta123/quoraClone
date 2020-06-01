const express = require("express");

const router = express.Router();

const questionController = require("../controller/question-controller");

router.post("/create", questionController.create);

module.exports = router;
