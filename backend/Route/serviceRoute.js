const express=require("express");
const router=express.Router();
const upload=require("../utils/upload/upload")

const {create,update,deleteblog,getAll,getById, remove}=require("../Controllers/serviceController");
router.route("/service/new").post(upload.single("image"), create);
router.route("/service/getAll").get(getAll);
router.route("/service/delete/:id").delete(remove);
router.route("/service/getById/:id").get(getById);
router.route("/service/update/:id").put(upload.single("image"),update);
module.exports=router;






