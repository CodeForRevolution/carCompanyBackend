

const Notification=require("../model/notification");



const image = require("../model/image");
const notification = require("../model/notification");

module.exports.create = async (req, res, next) => {
  console.log("you hit the create notification route", req.body);
  try {
    

    let data = req.body;
   
    const notification = await Notification.create(data);

   return res.status(201).json({
      data: notification,
      message: "Blog Created",
      success: true,
    });
  } catch (error) {
    console.log("error is cought", error);
    res.status(400).json({
      success: false,
      message: "notification not created",
      error: error,
    });
  }
};

module.exports.getAll = async (req, res, next) => 
    {
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
      const notification = await Notification.aggregate([
        {
          $match: {
            $or: [
              { vehicle: { $regex: search || "", $options: "i" } }, // Case-insensitive search by name
              { service: { $regex: search || "", $options: "i" } }, // Case-insensitive search by phone
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
    
    
      let count = notification[0]?.metadata[0]?.total ?? 0;
      let data = notification[0].data;
      console.log("hit the get patient route got the data");
      res.status(200).json({
        data,
        count,
      });
}


   
// module.exports.getById = async (req, res, next) => {
//       console.log("you hit the get pateint route");
//       try {
//         const existing = await Notification.findOne({ _id: req.params.id });
    
//         if (!existing) {
//           res.status(404).json({
//             message: "question not found",
//             success: false,
//           });
//         }
    
//         res.status(200).json({
//           success: true,
//           data: existing,
//         });
//       } catch (error) {
//         res.status(400).json({
//           success: false,
//           message: "Cannot fetch the Notification Now",
//           error,
//         });
//       }
// };

module.exports.getById = async (req, res, next) => {
  console.log("you hit the get pateint route");
  try {
    const existing = await Notification.findOne({ _id: req.params.id });

    if (!existing) {
      res.status(404).json({
        message: "notification not found",
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
      message: "Cannot fetch the Notification Now",
      error,
    });
  }
};


module.exports.update = async (req, res, next) => {
  try {
    let blog = await Notification.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
      message: "Notification updated",
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


module.exports.changeStatus = async (req, res, next) => {
  try {
    let blog = await Notification.findOneAndUpdate({ _id: req.params.id }, {isView:true}, {
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
      message: "Notification updated",
      success: true,
   
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
