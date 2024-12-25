const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const clientQueries = fs
    .readFileSync(path.join(__dirname, "../db/queries/clients.sql"), "utf8")
    .split("---");




exports.getAllProjects = async (req, res) => {

    try {
        const result = await db.query(clientQueries[0]);
        const projects = result.rows;
        return res
            .status(200)
            .json({ message: "Projects fetched successfully", projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching projects" });
    }
}

exports.createProjectForOneClient = async (req, res) => {
    const client_id = req.user.id;
    const {
        description,
        status,
        artisan_id,
    } = req.body;
    try {
        const result = await db.query(clientQueries[1], [
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
}
exports.createProjectForAllArtisans = async (req, res) => {
    const client_id = req.user.id;
    const {
        description,
        status,
        specialization,
    } = req.body;
    try {
        const result = await db.query(clientQueries[2], [
            client_id,
            description,
            status,
            specialization,
        ]);
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
exports.deleteProject = async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid Project ID" });
    }
    try {
        const result = await db.query(clientQueries[3], [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting project" });
    }
}