const Question = require("../models/Question");
const Answer = require("../models/Answer");

const voteQuestion = async (req, res) => {
  try {
    const { voteType } = req.body; // "up" or "down"
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ error: "Question not found" });

    voteType === "up" ? question.upvotes++ : question.downvotes++;
    await question.save();

    res.status(200).json({ message: "Vote recorded", question });
  } catch (err) {
    res.status(500).json({ error: "Error voting on question" });
  }
};

const voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body; // "up" or "down"
    const answer = await Answer.findById(req.params.id);

    if (!answer) return res.status(404).json({ error: "Answer not found" });

    voteType === "up" ? answer.upvotes++ : answer.downvotes++;
    await answer.save();

    res.status(200).json({ message: "Vote recorded", answer });
  } catch (err) {
    res.status(500).json({ error: "Error voting on answer" });
  }
};

module.exports = { voteQuestion, voteAnswer };
