const mongoose = require("mongoose");

const friendshipsSchema = new mongoose.Schema({
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

const Friends = mongoose.model("Friends", friendshipsSchema);
module.exports = Friends;
