const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc     Register a new user
// @route    POST /api/auth/register
// @access   Public

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({name, email, password });

    if (user) {
    res.status(201).json({
     message: "User registered successfully",
     token: generateToken(user._id),
    })
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Login user
// @route    POST /api/auth/login
// @access   Public

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {

  } catch(error) {
    res.status(500).json({ message: "Server error" });  
  }
};

// @desc     Get current logged-in user
// @route    GET /api/auth/me
// @access   Private

exports.getProfile = async (req, res) => {
  try {

  } catch(error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update user profile
// @route  PUT /api/auth/me
// @access Private
exports.updateUserProfile = async (req, res) => {};
