const mongoose = require("mongoose");

const forgetPasswordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    accessToken: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ForgetPassword = mongoose.model("ForgetPassword", forgetPasswordSchema);

module.exports = ForgetPassword;
