const express = require("express");
const {
  getArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
  createProject,
  getArtisanProjects,
  deleteProject,
} = require("../controllers/artisanController");

const {
  addCertification,
  getCertifications,
  deleteCertification,
} = require("../controllers/certificationController");

const {
  authenticateToken,
  isArtisan,
} = require("../middleware/authMiddleware");
const artisanSchema = require("../validations/aritsanValidation");
const validateRequest = require("../middleware/validationMiddleware");
const router = express.Router();

router.get("/", getArtisans);
router.get("/:id([0-9]+)", getArtisanById); // Add regex validation for numeric ID
router.post("/", artisanSchema.create, validateRequest, createArtisan);
router.put(
  "/",
  authenticateToken,
  isArtisan,
  artisanSchema.update,
  validateRequest,
  updateArtisan
);
router.delete("/", authenticateToken, deleteArtisan);
router.get("/?specialization=:specialization", getArtisans);

// routes for certifications
// Remove express.raw() and use express-fileupload for the /certifications route
router.post("/certifications", authenticateToken, isArtisan, addCertification);
router.get("/certifications/:id([0-9]+)", getCertifications);

router.delete(
  "/certifications/:id([0-9]+)",
  authenticateToken,
  isArtisan,
  deleteCertification
);

router.post("/project", authenticateToken, isArtisan, createProject);

router.get("/project/:id([0-9]+)", authenticateToken, getArtisanProjects);

router.delete(
  "/project/:id([0-9]+)",
  authenticateToken,
  isArtisan,
  deleteProject
);

module.exports = router;
