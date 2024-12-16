const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const artisanQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/artisans.sql"), "utf8")
  .split("---");

exports.getArtisans = async (req, res) => {
  try {
    const result = await db.query(artisanQueries[0]); // First query in artisans.sql
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createArtisan = async (req, res) => {
  const {
    name,
    specialization,
    contactInfo,
    portfolio,
    certifications,
    insuranceDetails,
  } = req.body;
  try {
    const result = await db.query(artisanQueries[1], [
      name,
      specialization,
      contactInfo,
      portfolio,
      certifications,
      insuranceDetails,
    ]);
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
