const mongoose = require('mongoose');
const { mongodbUri } = require('../config/config');

const connectDB = async () => {
  if (!mongodbUri) {
    console.error('ERROR: MongoDB URI is not defined in the configuration.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongodbUri, {
      connectTimeoutMS: 10_000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error while connecting to database:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
