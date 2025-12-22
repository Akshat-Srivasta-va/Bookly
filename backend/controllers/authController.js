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
    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        message: "User registered successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc     Login user
// @route    POST /api/auth/login
// @access   Public

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Get current logged-in user
// @route    GET /api/auth/me
// @access   Private

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avtar: user.avtar,  
      isPro: user.isPro,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update user profile
// @route  PUT /api/auth/me
// @access Private
exports.updateUserProfile = async (req, res) => {
  try {
const user = await User.findById(req.user.id);
if(user) {
  user.name = req.body.name || user.name;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
  });
} else {
  res.json({ message: "User not found" });
}
  } catch(error) {
    res.status(500).json({ message: "Server error" });
  }
};
