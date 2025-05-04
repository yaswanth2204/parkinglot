const Vehicle = require('../models/Vehicle');
const ParkingSpot = require('../models/ParkingSpot');
const ParkingTransaction = require('../models/ParkingTransaction');
const { findAvailableSpot } = require('../services/spotAllocator');
const { calculateFee } = require('../utils/feeCalculator');

const checkInVehicle = async (req, res) => {
  try {
    const { license_plate, vehicle_type } = req.body;

    let vehicle = await Vehicle.findOne({ license_plate });
    if (!vehicle) {
      vehicle = await Vehicle.create({ license_plate, vehicle_type });
    }

    const spot = await findAvailableSpot(vehicle_type);
    if (!spot) {
      return res.status(404).json({ message: 'No available parking spot.' });
    }

    spot.isOccupied = true;
    await spot.save();

    const transaction = await ParkingTransaction.create({
      vehicle_id: vehicle._id,
      spot_id: spot._id,
      entry_time: new Date(),
    });

    res.status(200).json({
      message: 'Vehicle checked in successfully.',
      spot_id: spot._id,
      floor_id: spot.floorId,
      entry_time: transaction.entry_time
    });
  } catch (error) {
    console.error('Check-in failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkOutVehicle = async (req, res) => {
  try {
    const { license_plate } = req.body;

    const vehicle = await Vehicle.findOne({ license_plate });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    const transaction = await ParkingTransaction.findOne({
      vehicle_id: vehicle._id,
      exit_time: { $exists: false }
    });
    if (!transaction) {
      return res.status(404).json({ message: 'No active parking session found.' });
    }

    const exitTime = new Date();
    const durationMs = exitTime - transaction.entry_time;
    const fee = calculateFee(durationMs, vehicle.vehicle_type);

    transaction.exit_time = exitTime;
    transaction.fee = fee;
    await transaction.save();

    await ParkingSpot.findByIdAndUpdate(transaction.spot_id, { isOccupied: false });

    res.status(200).json({
      message: 'Vehicle checked out successfully.',
      exit_time: transaction.exit_time,
      duration_minutes: Math.ceil(durationMs / (60 * 1000)),
      fee
    });
  } catch (error) {
    console.error('Check-out failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addParkingSpots = async (req, res) => {
  try {
    const { spots } = req.body;

    if (!Array.isArray(spots) || spots.length === 0) {
      return res.status(400).json({ message: 'Invalid spots data.' });
    }

    const createdSpots = await ParkingSpot.insertMany(spots);
    res.status(201).json({
      message: 'Parking spots added successfully.',
      spots: createdSpots
    });
  } catch (error) {
    console.error('Failed to add parking spots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  checkInVehicle,
  checkOutVehicle,
  addParkingSpots
};
