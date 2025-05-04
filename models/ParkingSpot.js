const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
  floorId: { type: String }, // Changed from ObjectId to String
  spotType: { type: String, enum: ['Compact', 'Regular', 'Large'] },
  isOccupied: { type: Boolean, default: false }
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
