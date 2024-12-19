const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const { registerSchema } = require("../schemas/auth");

router.post("/register", registerSchema, register);
router.post("/login", login);

module.exports = router;
