
const express=require('express');
const { createSurvey, getSurvey } = require('../Controllers/SurveyController');
const { isAuthenticatedUser } = require('../utils/auth');
const router=express.Router();
router.route("/survey").get(getSurvey)    
router.route("/survey/new").post(createSurvey);
module.exports=router;