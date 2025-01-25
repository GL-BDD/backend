const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const acceptedProjectQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/acceptedProject.sql"),
    "utf8",
  )
  .split("---");

exports.createAcceptedProject = async (req, res) => {
  const { price, proposal_id } = req.body;
  const artisan_id = req.user.id;
  const { rows } = await db.query(acceptedProjectQueries[1], [price,null,proposal_id,artisan_id]);
  res.status(201).json(rows[0]);
};