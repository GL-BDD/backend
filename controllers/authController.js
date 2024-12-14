const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/connections");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

/**
 * Register a new user
 * @param {string} req.body.username Username to register
 * @param {string} req.body.password Password to register
 * @returns {Object} JSON response with user object
 */
exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  // return res.json({ email, username, password });

  try {
    //TODO : Check if user already exists
    const user = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2;",
      [email, username]
    );

    if (user.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const result = await db.query(
      "INSERT INTO users (username,email, password) VALUES ($1, $2, $3) RETURNING id, username;",
      [username, email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

/**
 * Login a user and generate a JWT token
 * @param {string} req.body.username - Username to login
 * @param {string} req.body.password - Password to login
 * @returns {Object} JSON response with JWT token or error message
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Fetch user from the database
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [
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
      { id: user.id, username: user.username }, // Payload
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
