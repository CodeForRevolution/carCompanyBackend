const Survey=require("../model/survey");
const ErrorHandler=require('../utils/Errorhandler')
exports.createSurvey=async(req,res,next)=>{
    console.log("your hit the create survey ",req.body);
   const data=req.body;
   const survey=await Survey.create({...data});      // creating survey data 
   if(!survey){
    return next(new ErrorHandler("you got the error",405));
   }
   res.status(200).json({              // sending the response to frontend with survey
    message:"created survey",
    success:true,
    survey
   })

}

exports.getSurvey=async(req,res,next)=>{
    console.log("your hit the get survey ");

   const surveys=await Survey.find({});        // fetching all surveys from data base
   if(!surveys){
    return next(new ErrorHandler("you got the error",405));  // handling the error
   }
   res.status(200).json({
    message:"fetched survey",
    success:true,
    surveys                                   // sending the surveys to frontend
   })

}