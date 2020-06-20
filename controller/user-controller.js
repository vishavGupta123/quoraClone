const User = require("../models/user");
const passport = require("passport");
const Friends = require("../models/friendships");
const ForgetPassword = require("../models/forget_password");
const crypto = require("crypto");
const forgetPasswordMailer = require("../mailers/forget-password-mailers");
const request = require("request");
const fs = require("fs");
const path = require("path");

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user-sign-up");
};

module.exports.createUser = async function (req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      console.log(
        "User with this username already exist pls take another name"
      );
      return res.redirect("back");
    }
    // User.uploadedAvatar(req, res, function (err) {
    //   if (err) {
    //     console.log("Multer Error: ", err);
    //     return;
    //   }
    //   console.log(req.file);
    // });
    user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    console.log("successfully created a user");
    return res.redirect("/users/sign-in");
  } catch (err) {
    console.log(err);
  }
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user-sign-in");
};
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  if (req.isAuthenticated()) {
    return res.redirect("/?page_num=1");
  }
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "You have logged out");
  req.logout();
  return res.redirect("/");
};
module.exports.profile = async function (req, res) {
  try {
    let profile_user = await User.findById(req.params.id).populate("question");
    let friends = await Friends.findOne({
      fromId: req.user._id,
      toId: profile_user._id,
    });
    if (friends !== null) {
      let user = await User.findById(req.user._id).populate("question");

      return res.render("profile", {
        user: user,
        question: user.question,
        profile_user: profile_user,
        friends: friends,
      });
    } else {
      let user = await User.findById(req.user._id).populate("question");

      return res.render("profile", {
        user: user,
        question: user.question,
        profile_user: profile_user,
        friends: null,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.followUser = async function (req, res) {
  try {
    let fromUser = req.user;
    let toUser, friends;
    toUser = await User.findById(req.params.id);
    if (!toUser) {
      console.log("error in finding the user");
      return;
    }
    friends = await Friends.findOneAndDelete({
      fromId: fromUser._id,
      toId: toUser._id,
    });
    console.log(friends);
    if (friends) {
      await fromUser.friends.pull(friends._id);
      await fromUser.save();
      return res.redirect("back");
    }

    friends = await Friends.create({
      fromId: fromUser._id,
      toId: toUser._id,
      areFriends: true,
    });
    await fromUser.friends.push(friends._id);
    await fromUser.save();
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

module.exports.forgetPasswordForm = function (req, res) {
  return res.render("forget_password_form");
};

module.exports.forgetPassword = async function (req, res) {
  try {
    if (
      req.body["g-recaptcha-response"] === undefined ||
      req.body["g-recaptcha-response"] === "" ||
      req.body["g-recaptcha-response"] === null
    ) {
      return res.json({
        responseCode: 1,
        responseDesc: "Please Select captcha",
      });
    }
    var secretKey = "6LeuvP8UAAAAAJwezHQU1zT0jKxdkTvqzSIb7vYZ";
    var verificationUrl =
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
      secretKey +
      "&response=" +
      req.body["g-recaptcha-response"] +
      "&remoteip=" +
      req.connection.remoteAddress;
    let UrlVerification = await request(verificationUrl);
    if (UrlVerification) {
      res.json({
        responseCode: 0,
        responseDesc: "A reset password link has been sent to your email",
      });
    }
    console.log(UrlVerification);
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      let forget_password = await ForgetPassword.create({
        user: user._id,
        accessToken: crypto.randomBytes(20).toString("hex"),
        isValid: true,
      });
      console.log(forget_password);

      if (forget_password) {
        await forgetPasswordMailer.forgetPassword(forget_password, user);
      }
      req.flash(
        "success",
        "A reset password link has been sent to your Gmail " + user.email
      );
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err, "Error in sending the mail for forget password");
  }
};

module.exports.resetPasswordForm = function (req, res) {
  let accessToken = req.params.token;
  return res.render("reset_password_form", {
    accessToken: accessToken,
  });
};

module.exports.resetPassword = async function (req, res) {
  try {
    if (req.body.password === req.body.confirm_password) {
      let forgetPassword = await ForgetPassword.findOne({
        accessToken: req.params.token,
      });
      let user = await User.findById(forgetPassword.user);
      user.password = req.body.password;
      await user.save();
      forgetPassword.isValid = false;
      await forgetPassword.save();
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.addImage = async function (req, res) {
  try {
    console.log(req.params.id);
    let user = await User.findById(req.params.id);
    if (req.user.id == req.params.id) {
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("***Multer error ", err);
          return;
        }
        console.log(req.file);
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        console.log(user.avatar);
        return res.redirect("/users/profile/" + req.params.id);
      });
    }
  } catch (err) {
    console.log(err, "Multer error");
  }
};

module.exports.addImagePage = function (req, res) {
  return res.render("add-image", {
    user: req.params.id,
  });
};
