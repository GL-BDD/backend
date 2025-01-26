const db = require("../db/connections");
const fs = require("fs");
const path = require("path");

const acceptedProjectQueries = fs
  .readFileSync(
    path.join(__dirname, "../db/queries/acceptedProject.sql"),
    "utf8"
  )
  .split("---");

exports.createAcceptedProject = async (req, res) => {
  const artisan_id = req.user.id;
  const { accepted_price, proposal_id } = req.body;

  try {
    await db.query("BEGIN");
    const acceptedProjectResult = await db.query(acceptedProjectQueries[1], [
      accepted_price,
      "accepted",
      proposal_id,
      artisan_id,
    ]);

    const proposalResult = await db.query(acceptedProjectQueries[2], [
      proposal_id,
    ]);

    await db.query("COMMIT");

    return res.status(201).json({
      message:
        "Accepted project created and proposal status updated successfully",
      acceptedProject: acceptedProjectResult.rows[0],
    });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error creating accepted project:", error);
    return res.status(500).json({ message: "Error creating accepted project" });
  }
};
