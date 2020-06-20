const User = require("../models/user");
const Question = require("../models/question");
const Friend = require("../models/friendships");
module.exports.home = async function (req, res) {
  try {
    let questions, friends, profile_user;
    if (req.user) {
      profile_user = await User.findById(req.user._id).populate({
        path: "friends",
        populate: {
          path: "toId",
        },
      });
    }
    let pageLimit = 10;
    let pageNum = parseInt(req.query.page_num);
    let question_length = (await Question.find({})).length;
    if (question_length - ((pageNum - 1) * pageLimit + pageLimit) >= 0) {
      pageLimit = 10;
    } else {
      pageLimit = question_length - (pageNum - 1) * pageLimit;
    }

    var users;
    users = await User.find({});
    // console.log(users);
    let question = await Question.find({})
      .populate("user")
      .populate({
        path: "answers",
        populate: {
          path: "user",
        },
      })
      .populate("likes")
      .sort("-createdAt")
      .skip((pageNum - 1) * pageLimit)
      .limit(pageLimit);
    return res.render("home", {
      users: users,
      user: req.user,
      question: question,
      profile_user: profile_user,
      page_num: pageNum,
      pageLimit: pageLimit,
    });
  } catch (err) {
    console.log(err);
  }
};
