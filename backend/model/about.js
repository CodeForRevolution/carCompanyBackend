const mongoose = require("mongoose");
const aboutSchema = mongoose.Schema(
  {
    heading: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("About",aboutSchema);
