const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  createQuoteByArtisan,
  deleteQuote,
  getQuotesByProposalId,
} = require("../controllers/quoteController");

router.post("/", authenticateToken, createQuoteByArtisan);
router.get("/:id", authenticateToken, getQuotesByProposalId);
router.delete("/:id", authenticateToken, deleteQuote);

module.exports = router;
