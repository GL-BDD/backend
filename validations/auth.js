const { checkSchema } = require("express-validator");
exports.registerSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email address",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
  phoneNumber: {
    isMobilePhone: {
      errorMessage: "Invalid phone number",
    },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: "Phone number must be 10 characters long",
    },
    optional: true,
  },
  username: {
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username must be between 3 and 20 characters",
    },
    notEmpty: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
    },
    notEmpty: true,
  },
  role: {
    isIn: {
      options: [["client", "artisan"]],
      errorMessage: "role must be specified",
    },
    notEmpty: true,
  },
});
