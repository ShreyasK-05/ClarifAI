const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create({ ...req.body, postedBy: req.user.userId });

    const io = req.app.get("io");
    io.emit("newDoubt", question);

    res.status(201).json(question);
  } catch (err) {
    console.error("❌ Error posting question:", err);  
    res.status(500).json({ error: "Failed to post doubt" });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("postedBy", "name email");
    if (!question) return res.status(404).json({ error: "Not found" });

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
