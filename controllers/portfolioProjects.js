const db = require("../db/connections");
const fs = require("fs");
const path = require("path");
const {
  decodeOneProjectImages,
  decodeProjectsImages,
} = require("../utils/decodeImage");

const portfolioProjectQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/portfolioProject.sql"),
    "utf8"
  )
  .split("---");

exports.createPortfolioProject = async (req, res) => {
  const artisan_id = req.user.id;
  const { description, date, price, location } = req.body;
  try {
    const creationResult = await db.query(portfolioProjectQueries[1], [
      description,
      date,
      price,
      location,
      artisan_id,
    ]);
    const projectId = creationResult.rows[0].portfolio_project_id;
    if (!req.files || !req.files.attachments) {
      const project = creationResult.rows[0];
      return res
        .status(201)
        .json({ message: "project created successfully", project });
    }
    if (req.files.attachments) {
      try {
        let attachments = req.files.attachments;
        if (!Array.isArray(attachments)) {
          attachments = [attachments];
        }
        let resultRows = [];
        for (let attachment of attachments) {
          const fileBuffer = attachment.data;
          const fileType = attachment.mimetype;
          const encoding = attachment.encoding;
          const result = await db.query(portfolioProjectQueries[2], [
            fileBuffer,
            encoding,
            fileType,
            projectId,
          ]);
          resultRows.push(result.rows[0]);
        }
        const createdProject = creationResult.rows[0];
        createdProject.attachments = resultRows;
        const project = decodeOneProjectImages(createdProject);
        return res.json({ message: "project created successfully", project });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: `error adding attachments to the project the project ${projectId} is created`,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating project");
  }
};

exports.getArtisanPortfolioProjects = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(portfolioProjectQueries[4], [id]);
    const projects = result.rows;
    decodeProjectsImages(projects);
    return res
      .status(200)
      .json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching projects" });
  }
};

exports.deletePortfolioProject = async (req, res) => {
  // TODO : check if the user is the owner of the project
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await db.query(portfolioProjectQueries[5], [id, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({
      message: "Project deleted successfully",
      projectId: result.rows[0].id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting project" });
  }
};
