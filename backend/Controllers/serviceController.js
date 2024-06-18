
const _ = require("lodash");
const {
  uploadFromBuffer,
  deleteFile,
} = require("../utils/coudinary/coudinary");
const Serivces = require("../model/serivces");
const serivces = require("../model/serivces");


module.exports.create = async (req, res, next) => {
  console.log("you hit the create pateint route",req.body);
  try {
    const { heading,subHeading, content } = req.body;

    let data = { heading, subHeading,content  };

    if (req.file) {
      data.imageUrl = await uploadFromBuffer(req.file.buffer);
    }

    const newData = await serivces.create(data);
    //here we will send the the blog with image

    return res.status(201).json({
      data: newData,
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
  const service = await serivces.aggregate([
    {
      $match: {
        $or: [
          { heading: { $regex: search || "", $options: "i" } }, // Case-insensitive search by name
          { subHeading: { $regex: search || "", $options: "i" } }, // Case-insensitive search by phone
        ],
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
  console.log("patient", service);

  let count = service[0]?.metadata[0]?.total ?? 0;
  let data = service[0].data;
  console.log("hit the get patient route got the data");
  res.status(200).json({
    data,
    count,
  });
};

module.exports.getById = async (req, res, next) => {
  console.log("you hit the get pateint route");
  try {
    const existing = await Serivces.findOne({ _id: req.params.id });

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
module.exports.remove= async (req, res, next) => {
  console.log("you hit the delete pateint route");
  try {
    const existing = await Serivces.findOne({ _id: req.params.id });
   existing.imageUrl?  await deleteFile(existing.imageUrl):null;
    await serivces.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "services deleted",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "cant fetch  service now",
      error,
    });
  }
};

module.exports.update = async (req, res, next) => {
  console.log("you hit the update service route", req.body);

  try {
    const existing = await Serivces.findById(req.params.id);
    const { heading,subHeading, content } = req.body;
    const data = {heading,subHeading, content};
    if (req.file) {
      console.log("user updating the image");
      await deleteFile(existing.imageUrl);
      data.imageUrl = await uploadFromBuffer(req.file.buffer);
    }
    let service = await Serivces.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });

    if (!service) {
      return res.status(403).json({
        message: "unProcessable entity",
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "service updated",
      success: true,
      data: service,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      success: false,
      message: "cant update service right now",
      error,
    });
  }
};
