const express = require("express");
const router = express.Router();
const {
    generateOutLine,
    generateChapterContent
} = require("../controllers/aiController");

const { protect } = require("../middlewares/authMiddleware");

// Apply protect middleware to all AI routes
router.use(protect);

router.post("/generate-outline", generateOutLine);
router.post("/generate-chapter", generateChapterContent);

module.exports = router;