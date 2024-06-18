const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    contactId: {
      type: String,
    },

    contactType:{
       type:String,
       enum:["CUSTOMER","PARTNER"]
    },
   
    isview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", notificationSchema);



