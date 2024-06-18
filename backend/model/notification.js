const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    clt_name: {
      type: String,
    },
    vehicle: {
      type: String,
    },
    service: {
      type: String,
    },
    vehiclename: {
      type: String,
    },
    number: {
      type: String,
    },
    location: {
      type: String,
    },  
    isView: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Notification", notificationSchema);



