const mongoose = require("mongoose");
const servicesSchema = mongoose.Schema(
  {
    heading: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    aboutId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'About' 
    },
    content: {
      type: String,
    },

    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Service", servicesSchema);
