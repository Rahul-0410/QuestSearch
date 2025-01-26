const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  text: String,
  showInOption: Boolean,
  isAnswer: Boolean,
});

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrectAnswer: Boolean,
});

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  anagramType: String,
  blocks: [blockSchema],
  options: [optionSchema],
  siblingId: mongoose.Schema.Types.ObjectId,
  solution: String,
  title: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
