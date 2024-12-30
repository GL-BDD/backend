const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const { createQuote, deleteQuote } = require("../controllers/quoteController");

router.post("/", authenticateToken, createQuote);
router.delete("/:id", authenticateToken, deleteQuote);

module.exports = router;
