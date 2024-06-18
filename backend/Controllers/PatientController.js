const Patient = require("../model/patientModel");
const _ = require("lodash");
const{uploadFromBuffer,deleteFile}=require("../utils/coudinary/coudinary")
module.exports.createPatient = async (req, res, next) => {
  console.log("you hit the create pateint route", req.body);
  try {
    const patientdata = req.body;
    const {
      name,
      phonePrimary,
      phoneSecondary,
      weight,
      height,
      gender,
      category,
      age,
      address,
    } = req.body;

let profileImage=null

   
    if (req.file) {
      profileImage=await uploadFromBuffer(req.file.buffer)
     console.log("your profile Image",profileImage)
    }

    const patient = await Patient.create({
      name: _.capitalize(name),
      phonePrimary,
      phoneSecondary,
      weight,
      height,
      gender,
      category,
      age,
      address: _.capitalize(address),
      profileImage,
    });
    res.status(200).json({
      data: patient,
      message: "Patient created",
      success: true,
    });
  } catch (error) {
    console.log("error is cought",error);
    res.status(400).json({
      success: false,
      message: "Patient not created",
      error: error,
    });
  }
};

module.exports.getPatients = async (req, res, next) => {
  const {
    page = 1,
    pageSize = 999,
    filterField = null,
    search = null,
    fromDate = null,
    toDate = null,
    column = "createdAt",
    direction = -1,
  } = req.query;

  const skip = Math.max(0, parseInt(page, 10) - 1) * parseInt(pageSize, 10);
  console.log("shakir", req.query);
//  console.log("your data in patient",await Patient.find({}))
  const patients = await Patient.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: search || "", $options: "i" } }, // Case-insensitive search by name
          { phonePrimary: { $regex: search || "", $options: "i" } }, // Case-insensitive search by phone
        ],
      },
    },
    {
      $lookup: {
        from: "visit9",
        localField: "visits",
        foreignField: "_id",
        as: "visits",
      },
    },
    // {
    //   $unwind: "$visits", // Unwind visits to flatten the array
    // },
    {
      $unwind: {
        path: "$visits",
        preserveNullAndEmptyArrays: true,
      },
    },


    {
      $group: {
        _id: "$_id",
        phonePrimary: { $first: "$phonePrimary" },
        height: { $first: "$height" },
        weight: { $first: "$weight" },
        address: { $first: "$address" },
        phoneSecondary: { $first: "$phoneSecondary" },
        gender: { $first: "$gender" },
        category: { $first: "$category" },
        age: { $first: "$age" },
        name: { $first: "$name" },
        nextVisit: { $first: "$nextVisit" },
        createdAt: { $first: "$createdAt" },
        visits: { $push: "$visits" },
       // Push individual visit objects into the array
      },
    },
    {
      $sort: {
        [column]: Number(direction),
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $skip: skip },
          { $limit: parseInt(pageSize,10) },
          {
            $sort: {
              [column]: Number(direction),
            },
          },
        ],
      },
    },
  ]);
console.log("patient",patients);
  
  let count = patients[0]?.metadata[0]?.total[0] ?? 0;
  let data = patients[0].data;
  console.log("hit the get patient route got the data");
  res.status(200).json({
    data,
    count,
  });
};

module.exports.deletePatient = async (req, res, next) => {
  console.log("you hit the get pateint route");
  try {
    const patient = await Patient.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Patient deleted",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:"cant fetch patient right now",
      error,
    });
  }
};

module.exports.updatePatient = async (req, res, next) => {
  console.log("you hit the update pateint route", req.body);
  try {


  const existing=await Patient.findById(req.params.id)
let profileImage=null
    if(req.file){
      if(existing){
        deleteFile(existing.profileImage)
      }
     profileImage=await uploadFromBuffer(req.file.buffer); 
    }
   
    delete req.body.visits;
    delete req.body.nextVisit;
  console.log("what you are dupating",req.body)
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        address: _.capitalize(req.body.address),
        name: _.capitalize(req.body.name),
        height:req.body.height,
        profileImage
      }
    );
console.log("you are updated the patient")
    const newPatient=await Patient.findOne({_id:req.params.id})
    res.status(200).json({
      message: "Patient updated",
      success: true,
      data: newPatient
    });
  } catch (error) {
    console.log("error",error)
    res.status(400).json({
      success: false,
      message: "cant update patient right now",
      error,
    });
  }
};
