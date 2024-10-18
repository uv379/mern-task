const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// we can move this into .env file
const dbUrl = "mongodb+srv://uddhavbiswas379:SrgoSu2q46pzjq2s@agency-client-db.zpyzv.mongodb.net/?retryWrites=true&w=majority&appName=agency-client-db"
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {});
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
