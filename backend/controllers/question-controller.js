const Question = require("../models/Question");
const Answer = require("../models/Answer");

exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create({ ...req.body, postedBy: req.user.userId });

    const io = req.app.get("io");
    io.emit("newDoubt", question);

    res.status(201).json(question);
  } catch (err) {
    console.error("Error posting question:", err);  
    res.status(500).json({ error: "Failed to post doubt" });
  }
};


exports.displayQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    const io = req.app.get("io");
    io.emit("questionsUpdated", questions); 
    res.status(200).json({ questions }); 
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};


exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("postedBy", "name email");
    if (!question) return res.status(404).json({ error: "Question not found" });

    const answers = await Answer.find({ questionId: req.params.id }).populate("answeredBy", "name");

    res.status(200).json({ question, answers });
  } catch (err) {
    console.error("Error fetching question by ID:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.searchQuestions = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword || keyword.trim() === "") {
    return res.status(400).json({ error: "Keyword is required for search" });
  }

  const regex = new RegExp(keyword, "i");
  
  try {
    const results = await Question.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Error in searchQuestions:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

exports.filterQuestions = async (req, res) => {
  const { tags, verifiedOnly, urgentOnly } = req.query;

  let query = {};

  if (tags) {
    query.tags = { $in: tags.split(",") }; // ?tags=js,node
  }
  if (urgentOnly === "true") {
    query.isUrgent = true;
  }

  try {
    const filtered = await Question.find(query);
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Filtering failed" });
  }
};
