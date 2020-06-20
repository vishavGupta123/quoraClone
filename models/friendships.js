const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
  fromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  areFriends: {
    type: Boolean,
    required: true,
  },
});

const Friend = mongoose.model("Friend", friendshipSchema);
module.exports = Friend;
