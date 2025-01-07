const fs = require("fs");
const path = require("path");
const db = require("./connections"); //database connection file

(async () => {
  try {
    const createTables = fs
      .readFileSync(path.join(__dirname, "/queries/createTables.sql"))
      .toString();
    const result = await db.query(createTables);
    console.log("Tables created successfully!", result);
    process.exit(0);
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
})();
