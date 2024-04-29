const Doctor = require("../models/doctorSchema");
const mongoose = require("mongoose");

module.exports.doctors = (req, res) => {
    const { firstName, lastName } = req.query;
    const query = { active: true };

    if (firstName) {
        query.firstName = { $regex: new RegExp(firstName, "i") }; // Case-insensitive search
    }

    if (lastName) {
        query.lastName = { $regex: new RegExp(lastName, "i") }; // Case-insensitive search
    }

    Doctor.find(query)
        .then((doctors) => res.send(doctors))
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.doctor = (req, res) => {
    const doctorID = req.params.id;

    Doctor.findById(doctorID)
        .then((doctor) => res.send(doctor))
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.createDoctor = (req, res) => {
    const { lastName, firstName, specialty, active } = req.body;

    const newDoctor = new Doctor({
        lastName,
        firstName,
        specialty,
        active,
    });

    newDoctor.save()
        .then((savedDoctor) => res.status(201).json({ "new doctor": savedDoctor }))
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.deleteDoctor = (req, res) => {
    const doctorID = req.params.doctorID;

    const update = { active: false };

    Doctor.findByIdAndUpdate(doctorID, update, { new: true })
        .then((doctor) => res.send(doctor))
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.updateDoctor = (req, res) => {
    const { lastName, firstName, specialty, active } = req.body;
    const doctorID = req.params.id;
    const updatedFields = { lastName, firstName, specialty, active };

    Doctor.findByIdAndUpdate(doctorID, updatedFields, { new: true })
        .then((updatedDoctor) => {
            if (!updatedDoctor) {
                return res.status(404).json({ error: "Doctor not found" });
            }

            res.status(200).json(updatedDoctor);
        })
        .catch((error) => res.status(500).json({ error: error.message || "Internal Server Error" }));
};

module.exports.getDoctorByName = (req, res) => {
    const doctorName = req.params.name;

    Doctor.find({ $or: [{ firstName: doctorName }, { lastName: doctorName }] })
        .then((doctors) => {
            if (!doctors || doctors.length === 0) {
                return res.status(404).json({ error: "Doctor not found" });
            }
            res.status(200).json(doctors);
        })
        .catch((error) =>
            res.status(500).json({ error: error.message || "Internal Server Error" })
        );
};
