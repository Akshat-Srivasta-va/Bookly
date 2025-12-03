require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware to handle cors
app.use (
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

// connect database
connectDb();

// middleware
app.use(express.json());

// static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 

