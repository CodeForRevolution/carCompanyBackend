const mongoose = require("mongoose");

const visitSchema = mongoose.Schema({
  cause: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  patientId:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Patient' 
  },
  medicine: [
    {
      name: {
        type: String,
      },
    },
  ],
  response: {
    type: String,
  },
 
  imgUrl: {
    type: String,
  },

  nextVisit:{
    type:Date,
  }
},{ timestamps: true });

module.exports = mongoose.model("Visit9", visitSchema);
