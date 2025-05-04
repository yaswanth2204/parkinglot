
const ratesPerHour = {
  Motorcycle: 10,
  Car: 20,
  Bus: 40
};

function calculateFee(durationMs, vehicleType) {
  const hours = Math.ceil(durationMs / (60 * 60 * 1000));
  const rate = ratesPerHour[vehicleType] || 20;
  return rate * hours;
}

module.exports = { calculateFee };
