const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  createQuote,
  deleteQuote,
  getQuotesByProposalId,
} = require("../controllers/quoteController");

router.post("/", authenticateToken, createQuote);
router.get("/:id", authenticateToken, getQuotesByProposalId);
router.delete("/:id", authenticateToken, deleteQuote);

module.exports = router;
