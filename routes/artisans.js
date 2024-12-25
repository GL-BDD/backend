const express = require("express");
const multer = require("multer");
const fileUpload = require("express-fileupload");
const {
  getArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
  addCertification,
  getCertifications,
  deleteCertification,
} = require("../controllers/artisanController");
const { authenticateToken } = require("../middleware/authMiddleware");
const artisanSchema = require("../validations/aritsanValidation");
const validateRequest = require("../middleware/validationMiddleware");
const router = express.Router();

// Add express-fileupload middleware
router.use(fileUpload());

router.get("/", getArtisans);
router.get("/:id([0-9]+)", getArtisanById);  // Add regex validation for numeric ID
router.post("/", artisanSchema.create, validateRequest, createArtisan);
router.put("/", authenticateToken, artisanSchema.update, validateRequest, updateArtisan);
router.delete("/", authenticateToken, deleteArtisan);
router.get("/?specialization=:specialization", getArtisans);

// routes for certifications
// Remove express.raw() and use express-fileupload for the /certifications route
router.post(
  "/certifications",
  authenticateToken,
  (req, res, next) => {
    // Log info to ensure file is uploaded
    console.log(req.files?.attachment);
    next();
  },
  addCertification
);
router.get("/certifications/:id([0-9]+)", getCertifications);

router.delete("/certifications/:id([0-9]+)",authenticateToken, deleteCertification);



module.exports = router;