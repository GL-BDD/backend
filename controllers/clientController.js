const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const clientQueries = fs
  .readFileSync(path.join(__dirname, "../db/queries/clients.sql"), "utf8")
  .split("---");

exports.getClients = async (req, res) => {
  try {
    const result = await db.query(clientQueries[0]);
    const clients = result.rows;
    return res
      .status(200)
      .json({ message: "Clients fetched successfully", clients });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching clients" });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  try {
    const result = await db.query(clientQueries[1], [id]);
    const client = result.rows[0];

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res
      .status(200)
      .json({ message: "Client fetched successfully", client });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching client" });
  }
};

exports.updateClient = async (req, res) => {
  const { username, email } = req.body;
  console.log(req.user);
  const id = req.user.id
   // const id = 1; // for testing the api
  try {
    let updatedClient = null;

    if (username) {
      const result = await db.query(clientQueries[3], [username, id]);
      if (result.rows.length > 0) {
        updatedClient = result.rows[0];
      }
    }

    if (email) {
      const result = await db.query(clientQueries[4], [email, id]);
      if (result.rows.length > 0) {
        updatedClient = result.rows[0];
      }
    }

    if (!updatedClient) {
      return res
        .status(404)
        .json({ message: "Client not found or not updated" });
    }

    return res
      .status(200)
      .json({ message: "Client updated successfully", client: updatedClient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating client" });
  }
};

exports.deleteClient = async (req, res) => {
  const id = req.user.id; // when the client deletes his account
  // const id = 2; // for testing the api
  if (!id) {
    res.status(400).json("message: Client ID is required");
  }
  try {
    const result = await db.query(clientQueries[5], [id]);
    const clientId = result.rows[0];
    if (!clientId) {
      console.log("client not found");
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "client deleted successfully", clientId });
  } catch (error) {
    console.error(error);
    res.status(500).json("message: Error deleting client");
  }
};
