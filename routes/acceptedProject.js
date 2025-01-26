const express = require("express");

// const {
//   createAcceptedProject,
// } = require("../controllers/acceptedProjectsController");

const {
  authenticateToken,
  isArtisan,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticateToken, isArtisan, (req, res) => {
  return res.send("hello");
});

module.exports = router;
