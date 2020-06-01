const Question = require("../models/question");
const Answer = require("../models/answer");
const User = require("../models/user");
module.exports.addAnswer = async function (req, res) {
  console.log(req.user);
  let question = await Question.findById(req.body.question);
  if (!question) {
    console.log("Error in finding the question using the given id");
    return;
  }

  console.log(question);
  if (question) {
    let answer = await Answer.create({
      content: req.body.content,
      question: question.id,
      user: req.user._id,
    });

    await question.answers.push(answer.id);
    await question.save();
    if (req.xhr) {
      return res.status(200).json({
        data: {
          answer: answer,
          user: req.user,
        },
        message: "answer created!",
      });
    }

    return res.redirect("back");
  }
};
