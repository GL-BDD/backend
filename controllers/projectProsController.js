const db = require("../db/connections");
const fs = require("fs");
const path = require("path");
const { decodeProjectsImages } = require("../utils/decodeImage");

const projectProposalsQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/prjectProposal.sql"),
    "utf8"
  )
  .split("---");

const quoteQueries = fs.readFileSync(
  path.join(__dirname, "../db/queries/quotes.sql"),
  "utf8"
).split("---");

/**
 * Retrieves project proposals based on filters.
 */
exports.getProjectProposals = async (req, res) => {
  const { specialization, artisanId } = req.query;
  try {
    if (!specialization && !artisanId) {
      const result = await db.query(projectProposalsQueries[0]);
      const projects = result.rows;
      return res
        .status(200)
        .json({ message: "Projects fetched successfully", projects });
    }
    if (specialization) {
      const result = await db.query(projectProposalsQueries[4], [
        specialization,
      ]);
      const projects = result.rows;
      const projectsWithImages = decodeProjectsImages(projects);
      res.status(200).json({
        message: "Projects fetched successfully",
        projects: projectsWithImages,
      });
      return res.json(projectsWithImages);

    }
    if (artisanId) {
      const result = await db.query(projectProposalsQueries[5], [artisanId]);
      const projects = result.rows;
      return res
        .status(200)
        .json({ message: "Projects fetched successfully", projects });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching projects" });
  }
};

/**
 * Retrieves a single project proposal by ID.
 */
exports.getProjectProposalById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(projectProposalsQueries[8], [id]);
    const project = result.rows[0];
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res
      .status(200)
      .json({ message: "Project fetched successfully", project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching project" });
  }
};

/**
 * Helper function to add proposal images.
 */
const addProposalImages = async (projectId, coming_attachments) => {
  let resultRows = [];
  if (coming_attachments) {
    try {
      let attachments = coming_attachments;
      if (!Array.isArray(attachments)) {
        attachments = [attachments];
      }
      for (let attachment of attachments) {
        console.log(attachment);
        const fileBuffer = attachment.data;
        const mime_type = attachment.mimetype;
        const encoding = attachment.encoding;
        const result = await db.query(projectProposalsQueries[6], [
          fileBuffer,
          encoding,
          mime_type,
          projectId,
        ]);
        resultRows.push(result.rows[0]);
      }
      return resultRows;
    } catch (error) {
      console.error(error);
      return {
        message: `error adding attachments to the project proposals, the project is still created`,
      };
    }
  }
};

/**
 * Creates a new project proposal targeted to a single artisan.
 */
exports.createProjectForOneArtisan = async (req, res) => {
  const client_id = req.user.id;
  const { description, start_date, end_date, artisan_id, price, unit } = req.body;
  try {
    const result = await db.query(projectProposalsQueries[1], [
      description,
      start_date,
      end_date,
      artisan_id,
      client_id,
    ]);
    const quote = await db.query(quoteQueries[0], [price, unit, artisan_id, result.rows[0].proposal_id]);
    const project = result.rows[0];
    if (!req.files || !req.files.attachments) {
      return res
        .status(201)
        .json({
          message: "Project created successfully", project,
          quote: quote.rows[0]
        });
    }

    const images = await addProposalImages(
      project.proposal_id,
      req.files.attachments
    );
    project.attachments = images;
    const projectsWithImages = decodeProjectsImages([project]);
    res.status(201).json({
      message: "Project created successfully",
      project: projectsWithImages[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Creates a new project proposal targeted to all artisans of a specialization.
 */
exports.createProjectForAllArtisans = async (req, res) => {
  const client_id = req.user.id;
  const { description, start_date, end_date, specialization, price, unit } = req.body;
  try {
    const result = await db.query(projectProposalsQueries[2], [
      description,
      start_date,
      end_date,
      specialization,
      client_id,
    ]);
    const quote = await db.query(quoteQueries[0], [price, unit, null, result.rows[0].proposal_id]);
    const project = result.rows[0];
    if (!req.files || !req.files.attachments) {
      return res
        .status(201)
        .json({
          message: "Project created successfully",
          project: project,
          quote: quote.rows[0]
        });
    }

    const images = await addProposalImages(
      project.proposal_id,
      req.files.attachments
    );
    project.attachments = images;
    const projectsWithImages = decodeProjectsImages([project]);
    res.status(201).json({
      message: "Project created successfully",
      project: projectsWithImages[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Deletes an existing project proposal.
 */
exports.deleteProject = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid Project ID" });
  }
  try {
    const result = await db.query(projectProposalsQueries[3], [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res
      .status(200)
      .json({
        message: "Project deleted successfully",
        project_id: result.rows[0].proposal_id,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting project" });
  }
};

