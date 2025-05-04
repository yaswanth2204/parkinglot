const ParkingSpot = require('../models/ParkingSpot');

const spotPriority = {
  Motorcycle: ['Compact', 'Regular', 'Large'],
  Car: ['Regular', 'Large'],
  Bus: ['Large']
};

async function findAvailableSpot(vehicleType) {
  const types = spotPriority[vehicleType];
  if (!types) {
    throw new Error(`Invalid vehicle type: ${vehicleType}`);
  }
  for (const type of types) {
    console.log(`Searching for available spots of type: ${type}`);
    const spot = await ParkingSpot.findOne({ spotType: type, isOccupied: false });
    if (spot) {
      console.log(`Found available spot: ${spot._id}`);
      return spot;
    }
  }
  console.log('No available spots found.');
  return null;
}

module.exports = { findAvailableSpot };
