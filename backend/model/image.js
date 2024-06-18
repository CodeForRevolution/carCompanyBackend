const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    imageHeading: {
      type: String,
    },
    blogId:{
         type:mongoose.Schema.Types.ObjectId,
          ref:'Blog' 
    },
    content: {
      type: String,
    },
    isBanner:{
        type:Boolean,
        default:false,

    },
    imageUrl:{
        type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);