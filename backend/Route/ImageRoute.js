const express=require("express");
const router=express.Router();
const upload=require("../utils/upload/upload")

const {create,update,getAll,getById, deleteimage}=require("../Controllers/imageController");
router.route("/image/new").post(upload.single("image"), create);
router.route("/image/getAll").get(getAll);
router.route("/image/delete/:id").delete(deleteimage); 
router.route("/image/getById/:id").get(getById);
router.route("/image/update/:id").put(upload.single("image"),update);
module.exports=router;