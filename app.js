const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config({path:".env"});
console.log("your file",process.env.PORT)
const bodyParser=require("body-parser")
const cookieParser =require("cookie-parser");
const cors=require("cors")
  const allowedOrigins ="*"; // setting list of origin that can request in server
  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
  
app.use(bodyParser.urlencoded({ extended: true }));//Handling binary Data in server
app.use(express.json());//handling the json Data on Server
app.use(cookieParser());// handling the cookie
const errormiddleware=require("./backend/middleware/error")
app.get('/',(req,res,next)=>{
  res.send("<h1>Yahooo you will get well Soon Dr Khan's Clinics<h1/>")
})
app.post('/enquiry',(req,res,next)=>{
  console.log("your enquiryData",req.body)
  res.send("<h1>Yahooo you will get well Soon Dr Khan's Clinics<h1/>")
})
app.use("/api/v1/",require("./backend/Route/userRoute"));// directing route to user Route
app.use("/api/v1/",require("./backend/Route/SurveyRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/PatientRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/visitRoute"));// directing  route to surveyRoute
// app.use("/api/v1/",require("./backend/Route/blogRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/blogRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/ImageRoute"));// directing  route to surveyRoute
// app.use("/api/v1/",require("./backend/Route/ImageRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/aboutRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/serviceRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/questionRoute"));// directing  route to surveyRoute
app.use("/api/v1/",require("./backend/Route/notification"));// directing  route to surveyRoute
//middleware for the Error
app.use(errormiddleware);
module.exports=app;

