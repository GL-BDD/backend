/**
 * Routes for managing quotes.
 */
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  createQuoteByArtisan,
  deleteQuote,
  getQuotesByProposalId,
} = require("../controllers/quoteController");

/**
 * Creates a new quote by the authenticated artisan.
 */
router.post("/", authenticateToken, createQuoteByArtisan);

/**
 * Retrieves quotes by proposal ID.
 */
router.get("/:id", authenticateToken, getQuotesByProposalId);

/**
 * Deletes a quote by ID.
 */
router.delete("/:id", authenticateToken, deleteQuote);

module.exports = router;
