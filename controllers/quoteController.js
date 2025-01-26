const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const quoteQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/quotes.sql"), "utf8")
  .split("---");

const projectProposalsQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/acceptedProject.sql"),
    "utf8",
  )
  .split("---");

const accepted_projectsQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/acceptedProject.sql"),
    "utf8",
  )
  .split("---");

/**
 * Creates a quote by the authenticated artisan.
 */
exports.createQuoteByArtisan = async (req, res) => {
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

/**
 * Retrieves quotes by a proposal ID.
 */
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

/**
 * Deletes a quote by the authenticated artisan.
 */
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

/**
 * Accepts an artisan's quote and updates project status.
 */
exports.acceptQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(quoteQueries[1], [id]);
    const { artisan_id, proposal_id, price } = result.rows[0];
    const new_accepted_projct = await db.query(accepted_projectsQueries[1], [
      price,
      proposal_id,
      artisan_id,
    ]);
    await db.query(projectProposalsQueries[9], ["accepte", proposal_id]);
    return res
      .status(200)
      .json({
        message: "quote accepted successfully",
        accepted_project: new_accepted_projct.rows[0],
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error accepting quote" });
  }
};

/**
 * Refuses a quote and updates project status accordingly.
 */
exports.refuseQuote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(quoteQueries[1], [id]);
    const { proposal_id } = result.rows[0];
    await db.query(projectProposalsQueries[9], ["refuse", proposal_id]);
    return res.status(200).json({ message: "quote refused successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error refusing quote" });
  }
};

/**
 * Creates a quote by a client.
 */
exports.createQuoteByClient = async (req, res) => {
  const { price, unit, proposal_id } = req.body;
  try {
    const result = await db.query(quoteQueries[0], [
      price,
      unit,
      null,
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
