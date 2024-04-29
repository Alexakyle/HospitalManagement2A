const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get("/", doctorController.doctors);
router.get("/:id", doctorController.doctor);
router.get("/name/:name", doctorController.getDoctorByName); // Changed to getDoctorByName
router.post("/create", doctorController.createDoctor);
router.delete("/delete/:doctorID", doctorController.deleteDoctor);
router.put("/update/:id", doctorController.updateDoctor);

module.exports = router;
