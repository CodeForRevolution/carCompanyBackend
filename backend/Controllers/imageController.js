const Patient = require("../model/patientModel");
const Image = require("../model/image");
const Blog = require("../model/blog");
const _ = require("lodash");
const {
  uploadFromBuffer,
  deleteFile,
} = require("../utils/coudinary/coudinary");
const image = require("../model/image");

module.exports.create = async (req, res, next) => {
  console.log("you hit the create pateint route", req.body);
  try {
    const { imageHeading, content, blogId } = req.body;

    let data = { content, blogId, imageHeading };

    if (req.file) {
      data.imageUrl = await uploadFromBuffer(req.file.buffer);
    }

    const image = await Image.create(data);
    //here we will send the the blog with image

    return res.status(201).json({
      data: image,
      message: "Image Created",
      success: true,
    });
  } catch (error) {
    console.log("error is cought", error);
    res.status(400).json({
      success: false,
      message: "Image not created",
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
  const patients = await Blog.aggregate([
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
    const existing = await image.findOne({ _id: req.params.id });

    if (!existing) {
      res.status(404).json({
        message: "Image not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: existing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "cant fetch  Image now",
      error,
    });
  }
};
module.exports.deleteimage = async (req, res, next) => {
  console.log("you hit the delete pateint route");
  try {
    const image = await Image.findOne({ _id: req.params.id });
    await deleteFile(image.imageUrl);
    await Image.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      message: "image deleted",
      success: true,
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
  console.log("you hit the update pateint route", req.body);

  try {
    const image = await Image.findById(req.params.id);
    const { imageHeading, content, blogId, isBanner } = req.body;
    const data = { imageHeading, content, blogId, isBanner };
    if (req.file) {
      console.log("user updating the image");
      await deleteFile(image.imageUrl);
      data.imageUrl = await uploadFromBuffer(req.file.buffer);
    }
    let blog = await Image.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });

    if (!blog) {
      return res.status(403).json({
        message: "unProcessable entity",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Blog updated",
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
