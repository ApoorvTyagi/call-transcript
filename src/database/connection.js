const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
        connectTimeoutMS: 30000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error while connecting to database:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
