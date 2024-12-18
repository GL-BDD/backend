module.exports = router;
const express = require("express");
const {
  getArtisans,
  getArtisanById,
  createArtisan,
  deleteArtisan,
} = require("../controllers/artisanController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();
exports.router = router;

router.get("/", getArtisans);
router.get("/:id", getArtisanById);
router.post("/", createArtisan);
router.delete("/", authenticateToken, deleteArtisan);

module.exports = router;