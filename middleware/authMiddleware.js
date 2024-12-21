const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  console.log(authHeader)
  const token = authHeader.split(" ")[1] || "";
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // Attach user info to the request
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token" });
  }
};
