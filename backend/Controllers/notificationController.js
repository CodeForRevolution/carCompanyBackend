

const Notification=require("../model/notification");
const mail=require('../utils/triggerMail')




module.exports.create = async (req, res, next) => {
  console.log("you hit the create notification route", req.body);
  try {
    
    const {email,service,clt_name,location,number,vehiclename,notCustomer,workShopName}=req.body;

    if(notCustomer){
      const customerData={email,location,number,clt_name,workShopName,notCustomer}
      const notification = await Notification.create(customerData);


      let emailData = {
        clt_name:clt_name,
        location: location,
        number: number,
        cltEmail:req.body.email,
        email:"shakir973019@gmail.com",
        cltEmail:req.body.email,
        workShopName: workShopName,
        subject: `PARTNER REQUEST bY ${clt_name}`,
        // verifyLink: `${process.env.verifyLink}/api/v1/website/customer/verifyEmail/${user.id}`,
        companyLogo:
          "https://garragewala.com/images/logonew1.png",
        template: "becomePartner.html",
        // url: `${process.env.REQ_URL}#/change-pwd?sub=${user.id}&pin=${user.resetPin}&role=${user.role}`,
      };

      console.log("********what dat asending to email***********",emailData)
      mail.sendForgetMail(req, emailData);

      return res.status(201).json({
        data: notification,
        message: "notification Created",
        success: true,
      });

    }

    let data = req.body;
   
    const notification = await Notification.create(data);

    let emailData = {
      clt_name:data.clt_name,
      vehicle: data.vehicle,
      location: data.location,
      number: data.number,
      vehiclename: data.vehiclename,
      service: data.service,
     
      email:"shakir973019@gmail.com",
      OTP: 12345,
      subject: `CONTACT REQUEST bY ${data.clt_name}`,
      // verifyLink: `${process.env.verifyLink}/api/v1/website/customer/verifyEmail/${user.id}`,
      companyLogo:
        "https://garragewala.com/images/logonew1.png",
      template: "contact.html",
      // url: `${process.env.REQ_URL}#/change-pwd?sub=${user.id}&pin=${user.resetPin}&role=${user.role}`,
    };
    mail.sendForgetMail(req, emailData);

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
