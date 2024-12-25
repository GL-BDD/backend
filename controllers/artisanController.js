const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const artisanQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/artisans.sql"), "utf8")
  .split("---");

const certificationQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/certifications.sql"),
    "utf8"
  )
  .split("---");
const projectQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/projects.sql"), "utf8")
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
    username,
    specialization,
    contactInfo,
    portfolio,
    certifications,
    insuranceDetails,
  } = req.body;
  try {
    const result = await db.query(artisanQueries[2], [
      username,
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

exports.getArtisanById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid Artisan ID" });
  }

  try {
    const result = await db.query(artisanQueries[10], [id]);
    const artisan = result.rows[0];

    if (!artisan) {
      return res.status(404).json({ message: "Artisan not found" });
    }

    return res.status(200).json({
      message: "Artisan fetched successfully",
      artisan,
    });
  } catch (error) {
    console.error("Error fetching artisan:", error);
    return res.status(500).json({ message: "Error fetching artisan" });
  }
};

exports.updateArtisan = async (req, res) => {
  const {
    username,
    specialization,
    contact_info,
    portfolio,
    certifications,
    insurance_details,
  } = req.body;
  const id = req.user.id; // Use authenticated user's ID
  // const id = 1; // For testing purposes
  try {
    let updatedArtisan = null;

    if (username) {
      const result = await db.query(artisanQueries[3], [username, id]);
      if (result.rows.length > 0) {
        updatedArtisan = result.rows[0];
      }
    }

    if (specialization) {
      const result = await db.query(artisanQueries[4], [specialization, id]);
      if (result.rows.length > 0) {
        updatedArtisan = result.rows[0];
      }
    }

    if (contact_info) {
      const result = await db.query(artisanQueries[5], [contact_info, id]);
      if (result.rows.length > 0) {
        updatedArtisan = result.rows[0];
      }
    }

    if (portfolio) {
      const result = await db.query(artisanQueries[6], [portfolio, id]);
      if (result.rows.length > 0) {
        updatedArtisan = result.rows[0];
      }
    }

    if (certifications) {
      const result = await db.query(artisanQueries[7], [certifications, id]);
      if (result.rows.length > 0) {
        updatedArtisan = result.rows[0];
      }
    }

    if (insurance_details) {
      const result = await db.query(artisanQueries[8], [insurance_details, id]);
      if (result.rows.length > 0) {
        updatedArtisan = result.rows[0];
      }
    }

    if (!updatedArtisan) {
      return res
        .status(404)
        .json({ message: "Artisan not found or not updated" });
    }

    return res.status(200).json({
      message: "Artisan updated successfully",
      artisan: updatedArtisan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating artisan" });
  }
};

exports.deleteArtisan = async (req, res) => {
  const id = req.user.id; // Use authenticated user's ID
  if (!id) {
    res.status(400).json({ message: "Artisan ID is required" });
  }
  try {
    const result = await db.query(artisanQueries[9], [id]);
    const artisanId = result.rows[0];
    if (!artisanId) {
      return res.status(404).json({ message: "Artisan not found" });
    }
    res
      .status(200)
      .json({ message: "Artisan deleted successfully", artisanId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting artisan" });
  }
};

exports.addCertification = async (req, res) => {
  const artisanId = req.user.id;

  try {
    if (!req.files || !req.files.attachment) {
      return res.status(400).send("Attachment required");
    }
    const fileBuffer = req.files.attachment.data;
    console.log(fileBuffer);

    const result = await db.query(certificationQueries[1], [
      artisanId,
      fileBuffer,
    ]);

    res.status(201).json({
      message: "Certification added successfully",
      certificationId: result.rows[0].id,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.getCertifications = async (req, res) => {
  const artisanId = parseInt(req.params.id); // Get artisan ID from URL params

  if (!artisanId || isNaN(artisanId)) {
    return res.status(400).json({ message: "Invalid Artisan ID" });
  }

  try {
    const result = await db.query(certificationQueries[3], [artisanId]);

    res.status(200).json({
      message: "Certifications retrieved successfully",
      certifications: result.rows,
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
      return res.status(404).json({ message: "Certification not found" });
    }

    res.status(200).json({ message: "Certification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting certification" });
  }
};

exports.createProject = async (req, res) => {
  const artisanId = req.user.id;
  const { client_id, description, date, price, location } = req.body;
  console.log("creating");
  try {
    const creationResult = await db.query(projectQueries[1], [
      artisanId,
      client_id,
      description,
      date,
      price,
      location,
    ]);
    const projectId = creationResult.rows[0].id;

    if (req.files.attachments) {
      try {
        let attachments = req.files.attachments;
        if (!Array.isArray(attachments)) {
          attachments = [attachments];
        }
        let resultRows = [];
        for (attachment of attachments) {
          const fileBuffer = attachment.data;
          const result = await db.query(projectQueries[2], [
            projectId,
            fileBuffer,
          ]);
          resultRows.push(result.rows[0]);
        }
        return res.json(resultRows);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: `error adding attachments to the project the project ${projectId} is created`,
        });
      }
    }

    // const result = await db.query(certificationQueries[1], [
    //   artisanId,
    //   fileBuffer,
    // ]);
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating project");
  }
};

const getProjectAttachments = async (projectId) => {
  try {
    const result = await db.query(projectQueries[3], [projectId]);
    return result.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.getArtisanProjects = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(projectQueries[4], [id]);
    const projects = result.rows;
    for (project of projects) {
      project.attachments = await getProjectAttachments(project.id);
      // console.log(project);
    }
    return res
      .status(200)
      .json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching projects" });
  }
};

exports.deleteProject = async (req, res) => {
  // TODO : check if the user is the owner of the project
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await db.query(projectQueries[5], [id, userId]);
    return res.status(200).json({
      message: "Project deleted successfully",
      projectId: result.rows[0].id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting project" });
  }
};
