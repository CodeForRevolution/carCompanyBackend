const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    clt_name: {
      type: String,
    },
    notCustomer:{
         type:Boolean,
         default:false,
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
    workShopName:{
         type:String,
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



