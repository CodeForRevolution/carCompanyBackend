const mongoose=require("mongoose");

const surveySchema=mongoose.Schema({
    name:{
        type:String,
    },
    nationality:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    message:{
        type:String,
    },
    gender:{
        type:String
    },

})

module.exports= mongoose.model("survey",surveySchema);