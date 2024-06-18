const express=require("express");
const router=express.Router();
const upload=require("../utils/upload/upload")

const {create,update,deleteblog,getAll,getById, remove}=require("../Controllers/questionController");
router.route("/question/new").post(upload.single("image"), create);
router.route("/question/getAll").get(getAll);
router.route("/question/getById/:id").get(getById);
router.route("/question/delete/:id").delete(remove);
router.route("/question/update/:id").put(upload.single("image"),update);
module.exports=router;