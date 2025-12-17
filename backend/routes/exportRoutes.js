const express = require("express")
const { exportAsPDF, exportAsDocument } = require("../controllers/exportController")
const router = express.Router()
const {protect} = require("../middlewares/authMiddleware");

router.get("/:id/pdf", protect, exportAsPDF);
router.get("/:id/doc", protect, exportAsDocument);

module.exports = router;