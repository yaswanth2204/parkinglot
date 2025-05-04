require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const parkingRoutes = require('./routes/parkingRoutes');
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/parking', parkingRoutes);

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log(err));

module.exports = app;
