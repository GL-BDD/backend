const express = require("express");


const { authenticateToken } = require("../middleware/authMiddleware");
const { acceptQuote, refuseQuote, createQuoteByClient } = require("../controllers/quoteController");
const router = express.Router();

router.post("/accept", authenticateToken, acceptQuote);
router.post("/refuse", authenticateToken, refuseQuote);
router.post("/replay_client", authenticateToken, createQuoteByClient);
router.post("/replay_artisan", authenticateToken, createQuoteByClient);

module.exports = router;
