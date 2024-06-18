const express=require("express");
const { createvisit, updateVisit,getVisit,deleteVisit } = require("../Controllers/Visitcontroller");
const upload = require("../utils/upload/upload");

const router=express.Router();
router.route("/visit/new",upload.single("image")).post(createvisit);
router.route("/visit/:id").get(getVisit);
router.route("/visit/update",upload.single("image")).put(updateVisit);
router.route("/visit/delete/:id").delete(deleteVisit);
module.exports=router;