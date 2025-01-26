/**
 * Defines validation schemas for creating and updating Artisans.
 */
const { checkSchema } = require("express-validator");

const artisanSchema = {
  create: checkSchema({
    username: {
      in: ["body"],
      isString: true,
      notEmpty: true,
      trim: true,
      errorMessage: "Name is required and must be a string",
    },
    specialization: {
      in: ["body"],
      isString: true,
      notEmpty: true,
      trim: true,
      errorMessage: "Specialization is required and must be a string",
    },
    contact_info: {
      in: ["body"],
      isString: true,
      notEmpty: true,
      trim: true,
      errorMessage: "Contact information is required and must be a string",
    },
    portfolio: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Portfolio must be a string",
    },
    certifications: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Certifications must be a string",
    },
    insurance_details: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Insurance details must be a string",
    },
  }),
  update: checkSchema({
    username: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Name must be a string",
    },
    specialization: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Specialization must be a string",
    },
    contact_info: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Contact information must be a string",
    },
    portfolio: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Portfolio must be a string",
    },
    certifications: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Certifications must be a string",
    },
    insurance_details: {
      in: ["body"],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: "Insurance details must be a string",
    },
  }),
};

module.exports = artisanSchema;
