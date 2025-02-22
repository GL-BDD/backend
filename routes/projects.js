const express = require("express");

const {
  getProjectProposals,
  createProjectForOneArtisan,
  createProjectForAllArtisans,
  deleteProject,
  getProjectProposalById,
} = require("../controllers/projectProsController.js");

const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

//this route is for the ProjectProposals
router.get("/", authenticateToken, getProjectProposals);
router.get("/:id", authenticateToken, getProjectProposalById);
router.post("/", authenticateToken, createProjectForOneArtisan);
router.post("/all", authenticateToken, createProjectForAllArtisans);
router.delete("/:id", authenticateToken, deleteProject);

module.exports = router;
