const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/connections");
require("dotenv").config();
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const artisanQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/artisans.sql"), "utf8")
  .split("---");
const clientQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/clients.sql"), "utf8")
  .split("---");

exports.register = async (req, res) => {
  const { email, username, phoneNumber, password, role } = req.body;
  // return res.json({ email, username, password });

  //validation error handling----------
  const validationRes = validationResult(req);
  const validationErrors = validationRes.array();
  console.error(validationErrors);
  if (validationErrors.length > 0)
    return res.status(400).json({ validationErrors });
  //-----------

  //TODO : register depending on the client
  if (role === "client") {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to the database
      const result = await db.query(clientQueries[6], [
        username,
        email,
        phoneNumber,
        hashedPassword,
      ]);
      return res.status(201).json({ user: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error registering client" });
    }
  }
  if (role === "artisan") {
    try {
      // TODO: add artisan specific fields
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to the database
      const result = await db.query(artisanQueries[1], [
        username,
        email,
        phoneNumber,
        hashedPassword,
      ]);
      return res.status(201).json({ user: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error registering client" });
    }
  }
};

/**
 * Login a user and generate a JWT token
 * @param {string} req.body.username - Username to login
 * @param {string} req.body.password - Password to login
 * @returns {Object} JSON response with JWT token or error message
 */
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!role || (role !== "client" && role !== "artisan")) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  try {
    // Determine the table to query based on the role
    const table = role === "client" ? "clients" : "artisans";
    const result = await db.query(`SELECT * FROM ${table} WHERE email = $1;`, [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      // If user is not found, return an error
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If password does not match, return an error
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: role == "artisan" ? user.artisan_id : user.client_id,
        username: user.username,
        role,
        email: user.email,
        specialization: user.specialization,
      }, // Payload
      JWT_SECRET, // Secret key
      {
        expiresIn: JWT_EXPIRES_IN, // Token expiration
      }
    );

    // Respond with the generated token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error); // Log any error
    res.status(500).json({ message: "Error logging in user" }); // Respond with server error
  }
};
