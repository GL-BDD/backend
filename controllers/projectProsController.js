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
      return res.json(projectsWithImages);

      return res.status(200).json({
        message: "Projects fetched successfully",
        projects: projectsWithImages,
      });
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

const addProposalImages = async (projectId, coming_attachments) => {
  let resultRows = [];
  if (coming_attachments) {
    try {
      let attachments = coming_attachments;
      if (!Array.isArray(attachments)) {
        attachments = [attachments];
      }
      for (attachment of attachments) {
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
exports.createProjectForOneArtisan = async (req, res) => {
  const client_id = req.user.id;
  const { description, start_date, end_date, artisan_id } = req.body;
  try {
    const result = await db.query(projectProposalsQueries[1], [
      description,
      start_date,
      end_date,
      artisan_id,
      client_id,
    ]);
    const project = result.rows[0];
    if (!req.files || !req.files.attachments) {
      return res
        .status(201)
        .json({ message: "Project created successfully", project });
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
exports.createProjectForAllArtisans = async (req, res) => {
  const client_id = req.user.id;
  const { description, start_date, end_date, specialization } = req.body;
  try {
    const result = await db.query(projectProposalsQueries[2], [
      description,
      start_date,
      end_date,
      specialization,
      client_id,
    ]);
    const project = result.rows[0];
    if (!req.files || !req.files.attachments) {
      return res
        .status(201)
        .json({ message: "Project created successfully", project });
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
