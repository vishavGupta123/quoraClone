const Like = require("../models/like");
const Question = require("../models/question");
const Answer = require("../models/answer");

module.exports.toggleLike = async function (req, res) {
  try {
    // likes/toggle/?id=abcdef&type=Question
    let likeable;
    let deleted = false;

    if (req.query.type == "Question") {
      likeable = await Question.findById(req.query.id).populate("likes");
    } else {
      likeable = await Answer.findById(req.query.id).populate("likes");
    }

    //check if a like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    //if a like already exists
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      //make a new like
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.json(200, {
      message: "Request successfully",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
