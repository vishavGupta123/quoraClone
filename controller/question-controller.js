const Question = require("../models/question");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  console.log(req.body);
  console.log(req.user);
  let question = await Question.findOne({ question: req.body.question });
  if (question) {
    console.log("this type of question have been asked before");
    return res.redirect("back");
  }
  question = await Question.create({
    question: req.body.question,
    user: req.user,
  });
  console.log("question", question);

  await req.user.question.push(question._id);
  await req.user.save();
  if (req.xhr) {
    return res.status(200).json({
      data: {
        question: question,
      },
      message: "question created!",
    });
  }
  if (question) {
    console.log("successfully created a new question");
  }
  return res.redirect("back");
};
