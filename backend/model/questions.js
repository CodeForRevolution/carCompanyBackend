const mongoose = require("mongoose");
const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    aboutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "About",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Question", questionSchema);
