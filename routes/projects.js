const express = require("express");

const {
  getProjects,
  createProjectForOneClient,
  createProjectForAllArtisans,
  deleteProject,
} = require("../controllers/projectProsController.js");

const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

//this route is for the ProjectProposals
router.get("/", authenticateToken, getProjects);
router.post("/", authenticateToken, createProjectForOneClient);
router.post("/all", authenticateToken, createProjectForAllArtisans);
router.delete("/:id", authenticateToken, deleteProject);

module.exports = router;
