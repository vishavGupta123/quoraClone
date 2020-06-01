const User = require("../models/user");
const Question = require("../models/question");
const Friends = require("../models/friendships");
module.exports.home = function (req, res) {
  let questions, friends;
  var users;
  User.find({}, function (err, user) {
    if (err) {
      console.log("Database error");
      return;
    }
    // console.log(users);
    if (user) {
      users = user;
    }
  });
  // console.log(users);
  Question.find({})
    .populate("user")
    .populate({
      path: "answers",
      populate: {
        path: "user",
      },
    })
    .populate("likes")
    .sort("-createdAt")
    .exec(function (err, question) {
      console.log(question[0].answers[0] + "**&&");
      if (err) {
        console.log("Error in finding the questions from database");
        return res.redirect("back");
      } else {
        console.log(question.user);
        return res.render("home", {
          users: users,
          user: req.user,
          question: question,
        });
      }
    });
};
