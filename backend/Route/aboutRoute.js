const express=require("express");
const router=express.Router();
const upload=require("../utils/upload/upload")

const {create,update,deleteblog,getAll,getById}=require("../Controllers/aboutController");
router.route("/about/new").post(upload.single("image"), create);
router.route("/about/getAll").get(getAll);
router.route("/about/getById/:id").get(getById);
router.route("/about/update/:id").put(upload.single("image"),update);
module.exports=router;