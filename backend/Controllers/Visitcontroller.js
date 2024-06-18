const { cloneDeep } = require("lodash");
const Patient = require("../model/patientModel");
const Visit = require("../model/visitModel");

module.exports.createvisit = async (req, res, next) => {
  console.log("you hit the create visit route999", req.body);
  try {
    let { height, weight, patientId, medicine } = req.body;

    // medicine=Object.values(medicine)

    medicine = Object.values(medicine).filter((value) => value.name !== "");
    console.log("your medicine", req.body.medicine);

    const visitData = {
      ...req.body,
      medicine,
    };

    console.log("Vsit data in create", visitData);
    const visit = await Visit.create(visitData);

    console.log("your new visit body", visit);
    if (!visit._id) {
      res.status(400).json({
        visit,
        message: "visit not created",
        success: false,
      });
    }
    console.log("patient id");
    const patient = await Patient.findOne({ _id: patientId });
    if (!patient) {
      return res.status(401).json({
        message: "patient not found",
      });
    }
    patient.visits.push(visit._id);
    if (height) {
      console.log("height run");
      patient.height = height;
    }
    if (weight) {
      console.log("weight run");
      patient.weight = weight;
    }
    patient.nextVisit = req.body.nextVisit;
    await patient.save();

    res.status(200).json({
      data: visit,
      patient,
      message: "visit created",
      success: true,
      date: new Date(),
    });
  } catch (error) {
    console.log("error is cought");
    console.log(error);
    res.status(400).json({
      success: false,
      message: "visit not created",
      error: error,
    });
  }
};

module.exports.updateVisit = async (req, res) => {
  console.log("you hit the update visit route999", req.body);
  try {
    const {
      medicine,
      cause,
      height,
      weight,
      response,
      nextVisit,
      _id,
      patientId,
      createdAt,
      updatedAt,
    } = req.body;

    const vistUpdatedData = {
      medicine,
      cause,
      height,
      weight,
      response,
      nextVisit,
      _id,
      patientId,
      createdAt,
      updatedAtresponse: response ? response : "",
    };
    console.log("your date in viside update",vistUpdatedData.nextVisit)
    const visit = await Visit.findOneAndUpdate({ _id: _id }, vistUpdatedData);
    const patient = await Patient.findOne({ _id: patientId });
    if (!patient) {
      return res.status(401).json({
        message: "patient not found",
      });
    }

    console.log("your patient is findout", patient);
    if (height) {
      console.log("height run");
      patient.height = height;
    }
    if (weight) {
      console.log("weight run");
      patient.weight = weight;
    }
    if(vistUpdatedData.nextVisit){
      patient.nextVisit=vistUpdatedData.nextVisit;
    }

    await patient.save();

    res.status(200).json({
      data: vistUpdatedData,
      patient,
      message: "visit updated",
      success: true,
    });
  } catch (error) {}
};

module.exports.getVisit = async (req, res) => {
  console.log("you hit the get visit route");
  try {
    const visit = await Visit.findOne({ _id: req.params.id });
    res.status(200).json({
      data: visit,
      message: "get the visit",
      success: true,
    });
  } catch (error) {}
};

module.exports.deleteVisit = async (req, res) => {
  console.log("yout hit the visit route", req.params.id);
  try {
    const visit = await Visit.findOne({ _id: req.params.id });
    const patient = await Patient.findOne({ _id: visit.patientId });

    console.log("your got the visit", visit);
    console.log("you got the patient ", patient);
    patient.visits = patient.visits.filter((v) => v._id !== visit._id);
    patient.save();
    if (visit) {
      await visit.deleteOne();
      res.status(200).json({
        message: "Visit deleted successfully",
        success: true,
        data: visit,
      });
    } else {
      res.status(404).json({
        message: "Visit not found",
        success: false,
      });
    }

    res.status(200).json({
      data: visit,
      message: "get the visit",
      success: true,
    });
  } catch (error) {}
};
