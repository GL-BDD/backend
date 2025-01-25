const express = require("express");

const {
    createAcceptedProject
  } = require("../controllers/acceptedProjectsController");

const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticateToken, createAcceptedProject);

module.exports = router;
