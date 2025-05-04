const express = require('express');
const router = express.Router();
const { checkInVehicle, checkOutVehicle, addParkingSpots } = require('../controllers/parkingController');

router.post('/check-in', checkInVehicle);
router.post('/check-out', checkOutVehicle);
router.post('/add-spots', addParkingSpots);

module.exports = router;
