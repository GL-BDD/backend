const express = require("express");
const {
  getArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
} = require("../controllers/artisanController");
const { authenticateToken } = require("../middleware/authMiddleware");
const artisanSchema = require("../validations/aritsanValidation");
const validateRequest = require("../middleware/validationMiddleware");
const router = express.Router();

router.get("/", getArtisans);
router.get("/:id", getArtisanById);
router.post("/", artisanSchema.create, validateRequest, createArtisan);
router.put("/", authenticateToken, artisanSchema.update, validateRequest, updateArtisan);
router.delete("/", authenticateToken, deleteArtisan);

module.exports = router;