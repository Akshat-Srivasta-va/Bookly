const mongoose = require("mongoose");

const connnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connectin to MongoDb", err);
        process.exit(1);    
    }
};

module.exports = connnectDB;