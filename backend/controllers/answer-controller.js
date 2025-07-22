const Answer = require("../models/Answer");
const Question = require("../models/Question");

const postAnswer = async (req, res) => {
  try {
    const { text } = req.body;
    const { questionId } = req.params;

    const answer = await Answer.create({
      questionId,
      text,
      answeredBy: req.user.userId,
    });

    const question = await Question.findById(questionId).populate("postedBy");
    const io = req.app.get("io");

    io.to(question.postedBy._id.toString()).emit("newAnswer", {
      questionId: question._id,
      answer,
    });

    res.status(201).json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post answer" });
  }
};

const displayAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({});

    const io = req.app.get("io");
    io.emit("answersUpdated", answers); 

    res.status(200).json({ answers }); 
  } catch (err) {
    console.error("Error fetching answers:", err);
    res.status(500).json({ error: "Failed to fetch answers" });
  }
};

const replyToAnswer = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;

    const reply = {
      text,
      repliedBy: req.user.userId,
      createdAt: new Date(),
    };

    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      { $push: { replies: reply } },
      { new: true }
    ).populate("replies.repliedBy", "name");

    res.status(200).json(updatedAnswer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add reply" });
  }
};

const verifyAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    const answer = await Answer.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    ).populate("answeredBy", "name");

    const io = req.app.get("io");
    io.to(answer.answeredBy._id.toString()).emit("answerVerified", {
      answerId: id,
    });

    res.status(200).json({ message: "Answer verified", answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify answer" });
  }
};

module.exports = {
  postAnswer,
  replyToAnswer,
  verifyAnswer,
  displayAnswers,
};
