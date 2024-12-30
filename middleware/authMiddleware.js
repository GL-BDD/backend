const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  // console.log(authHeader)
  const token = authHeader.split(" ")[1] || "";
  // console.log(token)
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

exports.isArtisan = (req, res, next) => {
  if (req.user.role === "artisan") {
    return next();
  } else {
    return res.status(403).json({ message: "unauthorized user" });
  }
};

exports.isClient = (req, res, next) => {
  if (req.user.role === "client") {
    return next();
  } else {
    return res.status(403).json({ message: "unauthorized user" });
  }
};
