const mongoose=require("mongoose");

const patientSchema=mongoose.Schema({
    name:{
        type:String,
    },
  
    phonePrimary:{
        type:String
    },
    phoneSecondary:{
        type:String
    },
    weight:{
        type:Number
    },
    height:{
        type:Number,
    },
    gender:{
        type:String
    },
    category:{
        type:String,
        enum:["Hijama","Khatna","ViddhaKarma","Agnikarma","Chiropractic"]
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },

    nextVisit:{
        type:Date
    },
    lastVisited:{
        type:Date
    },
    profileImage:{
         type:String
    },
    visits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit9' }],

},{
    timestamps: true
})

module.exports= mongoose.model("Patient",patientSchema);