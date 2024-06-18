
const Question=require("../model/questions");
const _ = require("lodash");
const {
  uploadFromBuffer,
  deleteFile,
} = require("../utils/coudinary/coudinary");


module.exports.create = async (req, res, next) => {
  console.log("you hit the create pateint route", req.body);
  try {
    const { question, answer, aboutId } = req.body;

    let data = { question, answer, aboutId  };
   
    const newData = await Question.create(data);

   return res.status(201).json({
      data: newData,
      message: "Blog Created",
      success: true,
    });
  } catch (error) {
    console.log("error is cought", error);
    res.status(400).json({
      success: false,
      message: "question not created",
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
  
  //  console.log("your data in patient",await Patient.find({}))
  const patients = await Question.aggregate([
    {
      $match: {
        $or: [
          { question: { $regex: search || "", $options: "i" } }, // Case-insensitive search by name
          { answer: { $regex: search || "", $options: "i" } }, // Case-insensitive search by phone
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


  let count = patients[0]?.metadata[0]?.total ?? 0;
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
    const existing = await Question.findOne({ _id: req.params.id });

    if (!existing) {
      res.status(404).json({
        message: "question not found",
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
    let blog = await Question.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
      message: "Question updated",
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



module.exports.remove = async (req, res, next) => {
    console.log("you hit the get pateint route");
    try {
      const question = await Question.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: "question deleted",
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "cant fetch  question now",
        error,
      });
    }
  };


