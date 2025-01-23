const db = require("../db/connections");
const fs = require("fs");
const path = require("path");
const { decode } = require("punycode");

const projectQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/prjectProposal.sql"),
    "utf8"
  )
  .split("---");

const decodeImages = (projects) => {
  const projectsWithImages = projects.map((project) => {
    if (project.attachment) {
      // Convert the BYTEA (binary) data to a Base64 string
      const base64Image = Buffer.from(project.attachment).toString("base64");
      return {
        ...project,
        attachment: `data:image/jpeg;base64,${base64Image}`, // Adjust MIME type if necessary
      };
    }
    return project;
  });
  return projectsWithImages;
};

exports.getProjects = async (req, res) => {
  const { specialization, artisanId } = req.query;
  try {
    if (!specialization && !artisanId) {
      const result = await db.query(projectQueries[0]);
      const projects = result.rows;
      return res
        .status(200)
        .json({ message: "Projects fetched successfully", projects });
    }
    if (specialization) {
      const result = await db.query(projectQueries[4], [specialization]);
      const projects = result.rows;
      const projectsWithImages = decodeImages(projects);
      return res.status(200).json({
        message: "Projects fetched successfully",
        projects: projectsWithImages,
      });
    }
    if (artisanId) {
      const result = await db.query(projectQueries[5], [artisanId]);
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

const addProposalImages = async (projectId, coming_attachments) => {
  console.log(projectId);
  if (coming_attachments) {
    try {
      let attachments = coming_attachments;
      if (!Array.isArray(attachments)) {
        attachments = [attachments];
      }
      let resultRows = [];
      for (attachment of attachments) {
        const fileBuffer = attachment.data;
        const encoding = attachment.encoding;
        const result = await db.query(projectQueries[6], [
          projectId,
          fileBuffer,
          encoding,
        ]);
        resultRows.push(result.rows[0]);
      }
      console.log("we here");
    } catch (error) {
      console.error(error);
      return {
        message: `error adding attachments to the project proposals, the project is still created`,
      };
    }
  }
};
exports.createProjectForOneClient = async (req, res) => {
  const client_id = req.user.id;
  const { description, status, artisan_id } = req.body;
  try {
    const result = await db.query(projectQueries[1], [
      client_id,
      artisan_id,
      description,
      status,
    ]);
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createProjectForAllArtisans = async (req, res) => {
  const client_id = req.user.id;
  const { description, status, specialization } = req.body;
  const attachments = req.files.attachments;
  try {
    const result = await db.query(projectQueries[2], [
      client_id,
      specialization,
      description,
      status,
    ]);
    const projectId = result.rows[0].id;
    await addProposalImages(projectId, attachments);
    res.status(201).json({ id: result.rows[0].id });
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
    const result = await db.query(projectQueries[3], [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting project" });
  }
};
