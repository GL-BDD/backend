const express = require("express");
const {
  getArtisans,
  createArtisan,
} = require("../controllers/artisanController");
const router = express.Router();

router.get("/", getArtisans);
router.post("/", createArtisan);

module.exports = router;
