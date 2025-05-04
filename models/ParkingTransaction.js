
const mongoose = require('mongoose');

const ParkingTransactionSchema = new mongoose.Schema({
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  spot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot' },
  entry_time: { type: Date },
  exit_time: { type: Date },
  fee: { type: Number }
});

module.exports = mongoose.model('ParkingTransaction', ParkingTransactionSchema);
