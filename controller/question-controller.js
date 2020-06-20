const Question = require("../models/question");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    console.log(req.body);
    console.log(req.user);
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
  } catch (err) {
    console.log(err);
  }
};
