const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [String],
  image: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isUrgent: { type: Boolean, default: false },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
