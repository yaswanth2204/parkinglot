
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  license_plate: { type: String, unique: true },
  vehicle_type: { type: String, enum: ['Motorcycle', 'Car', 'Bus'] }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
