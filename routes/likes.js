const express = require("express");
const router = express.Router();

const likeConroller = require("../controller/likes_controller");

router.post("/toggle", likeConroller.toggleLike);

module.exports = router;
