const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const quoteQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/quotes.sql"), "utf8")
  .split("---");

exports.createQuote = async (req, res) => {
  const artisan_id = req.user.id;
  const { price, unit, proposal_id } = req.body;
  try {
    const result = await db.query(quoteQueries[0], [
      price,
      unit,
      artisan_id,
      proposal_id,
    ]);
    const quoteId = result.rows[0].id;
    return res
      .status(200)
      .json({ message: "quote created successfully", quoteId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error creating quote" });
  }
};

exports.getQuotesByProposalId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(quoteQueries[1], [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error fetching quotes" });
  }
};

exports.deleteQuote = async (req, res) => {
  const artisanId = req.user.id;
  const { id } = req.params;
  try {
    const result = await db.query(quoteQueries[2], [artisanId, id]);
    const quoteId = result.rows[0].id;
    return res
      .status(200)
      .json({ message: "quote deleted successfully", quoteId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error deleting quote" });
  }
};
