const db = require("../db/connections");
const fs = require("fs");
const path = require("path");
const { decodeImage } = require("../utils/decodeImage");

const certificationQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/certifications.sql"),
    "utf8"
  )
  .split("---");

exports.addCertification = async (req, res) => {
  const artisan_id = req.user.id;
  const { issue_date, certification_name } = req.body;
  try {
    if (!req.files || !req.files.attachment) {
      return res.status(400).send("Attachment required");
    }

    const mimetype = req.files.attachment.mimetype;
    const fileBuffer = req.files.attachment.data;
    const result = await db.query(certificationQueries[1], [
      certification_name,
      issue_date,
      fileBuffer,
      mimetype,
      artisan_id,
    ]);
    const certificationWithImages = await decodeImage([result.rows[0]]);

    return res.status(201).json({
      message: "Certification added successfully",
      certification: certificationWithImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading certifications" });
  }
};

exports.getCertifications = async (req, res) => {
  const artisanId = parseInt(req.params.id); // Get artisan ID from URL params

  if (!artisanId || isNaN(artisanId)) {
    return res.status(400).json({ message: "Invalid Artisan ID" });
  }

  try {
    const result = await db.query(certificationQueries[3], [artisanId]);
    const certifications = result.rows;
    const certificationsWithImages = await decodeImage(certifications);
    return res.status(200).json({
      message: "Certifications retrieved successfully",
      certifications: certificationsWithImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving certifications" });
  }
};

exports.deleteCertification = async (req, res) => {
  const certificationId = parseInt(req.params.id);

  if (!certificationId || isNaN(certificationId)) {
    return res.status(400).json({ message: "Invalid Certification ID" });
  }
  const artisanId = req.user.id;
  try {
    const result = await db.query(certificationQueries[2], [
      certificationId,
      artisanId,
    ]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Certification not found or unauthorized" });
    }

    res.status(200).json({ message: "Certification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting certification" });
  }
};
