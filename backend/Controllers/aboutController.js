const Patient = require("../model/patientModel");
const Image = require("../model/image");
const About=require("../model/about");
const Blog = require("../model/blog");
const _ = require("lodash");
const {
  uploadFromBuffer,
  deleteFile,
} = require("../utils/coudinary/coudinary");

const image = require("../model/image");
const about = require("../model/about");

module.exports.create = async (req, res, next) => {
  console.log("you hit the create pateint route", req.body);
  try {
    const { heading, subHeading, content } = req.body;

    let data = { heading, subHeading, content };
   
    const about = await About.create(data);

   return res.status(201).json({
      data: about,
      message: "Blog Created",
      success: true,
    });
  } catch (error) {
    console.log("error is cought", error);
    res.status(400).json({
      success: false,
      message: "about not created",
      error: error,
    });
  }
};

module.exports.getAll = async (req, res, next) => {
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
  const patients = await About.aggregate([
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
          { $limit: parseInt(pageSize, 10) },
          {
            $sort: {
              [column]: Number(direction),
            },
          },
        ],
      },
    },
  ]);
  console.log("patient", patients);

  let count = patients[0]?.metadata[0]?.total[0] ?? 0;
  let data = patients[0].data;
  console.log("hit the get patient route got the data");
  res.status(200).json({
    data,
    count,
  });
};

module.exports.getById = async (req, res, next) => {
  console.log("you hit the get pateint route");
  try {
    const existing = await About.findOne({ _id: req.params.id });

    if (!existing) {
      res.status(404).json({
        message: "about not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: existing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "cant fetch  blog now",
      error,
    });
  }
};


module.exports.update = async (req, res, next) => {
  try {
    let blog = await About.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!blog) {
      res.status(403).json({
        message: "unProcessable entity",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      message: "About updated",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      success: false,
      message: "cant update Blog right now",
      error,
    });
  }
};
