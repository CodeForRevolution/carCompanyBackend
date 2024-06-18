const express=require("express");
const router=express.Router();
const upload=require("../utils/upload/upload")

const {createPatient, getPatients, deletePatient, updatePatient}=require("../Controllers/PatientController");
router.route("/patient/new").post(upload.single("image"), (req, res, next) => {
    console.log("Body received:", req.body);
    console.log("File received:", req.file);
    next();
  }, createPatient);
router.route("/patient/get").get(getPatients);
router.route("/patient/delete/:id").delete(deletePatient); 
router.route("/patient/update/:id").put(upload.single("image"),updatePatient);
module.exports=router;

