const mongoose = require("mongoose");

const googleRatingSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  content: {
    type: String,
  },
  rating: {
    type: Number,
  }
}, { _id: true });



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
    googleRating:[googleRatingSchema],
  },
  { timestamps: true },
  
);
module.exports = mongoose.model("About",aboutSchema);


