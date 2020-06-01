const User = require("../models/user");
const passport = require("passport");
const Friends = require("../models/friendships");
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
    return res.redirect("/");
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

    let user = await User.findById(req.user._id).populate("question");

    return res.render("profile", {
      user: user,
      question: user.question,
      profile_user: profile_user,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.followUser = async function (req, res) {
  let fromUser = req.user;
  let toUser, friends;
  toUser = await User.findById(req.params.id);
  if (!toUser) {
    console.log("error in finding the user");
    return;
  }

  friends = await Friends.create({
    fromId: fromUser._id,
    toId: toUser._id,
    areFriends: true,
  });
  await fromUser.friends.push(friends._id);
  await fromUser.save();
  return res.redirect("back");
};
