const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    vehicleType: {
      type: String,
    },

    pickupCity: {
      type: String,
    },

    vehicleName: {
      type: String,
    },
    service: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },

    isview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", notificationSchema);