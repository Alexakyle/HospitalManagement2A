const Admission = require("../models/admissionSchema");

const mongoose = require("mongoose");

module.exports.admissions = (req, res) => {
    Admission.find({ active: true })
      .then((admissions) => res.send(admissions))
      .catch((error) => res.send(error));
  };
  
  module.exports.admission = (req, res) => {
    const admissionID = req.params.id;
  
    Admission.findById(admissionID)
      .then((admissions) => res.send(admissions))
      .catch((error) => res.send(error));
  };


module.exports.createAdmission = (req, res) => {
    const { admissionDate, dischargeDate, diagnosis} = req.body;
  
    const newAdmission = new Admission({
      admissionDate,
      dischargeDate,
      diagnosis
    });
  
    try {
      const savedAdmission = newAdmission.save();
      res.status(201).json({ "new admission": newAdmission });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  };
  
  module.exports.deleteAdmission = (req, res) => {
    const admissionID = req.params.admissionID;
    console.log(admissionID);
  
    const update = { active: false};
  
    Admission.findByIdAndUpdate(admissionID, update, { new: true })
      .then((admission) => res.send(admission))
      .catch((error) => res.send(error));
  };
  
  module.exports.updateAdmission = (req, res) => {
    const { admissionDate, dischargeDate, diagnosis } = req.body;
  
    console.log(req.body);
  
    const admissionID = req.params.id;
    console.log(admissionID);
  
    const updatedFields = { admissionDate, dischargeDate, diagnosis };
  
    console.log(updatedFields);
  
    Admission.findByIdAndUpdate(admissionID, updatedFields, { new: true })
      .then((updatedAdmission) => {
        if (!updatedAdmission) {
          return res.status(404).json({ error: "admission not found" });
        }
  
        res.status(200).json(updatedAdmission);
      })
  
      .catch((error) => {
        res.status(500).json({ error: error.message || "Internal server error" });
      });
  };
  