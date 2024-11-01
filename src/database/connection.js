const mongoose = require('mongoose');
const { mongodbUri } = require('../config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      connectTimeoutMS: 30000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error while connecting to database:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
