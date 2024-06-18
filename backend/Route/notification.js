const express=require("express");
const router=express.Router();
const upload=require("../utils/upload/upload")

const {create,update,deleteblog,getAll,getById,changeStatus}=require("../Controllers/notificationController");
router.route("/notification/new").post(create);
router.route("/notification/getAll").get(getAll);
router.route("/notification/getById/:id").get(getById);
router.route("/notification/update/:id").put(update);
router.route("/notification/changeStatus/:id").put(changeStatus);

module.exports=router;