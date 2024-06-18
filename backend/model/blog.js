const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    heading: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    imageUrl:{
      type:String
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema);
