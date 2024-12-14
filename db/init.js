const fs = require("fs");
const path = require("path");
const db = require("./connections"); //database connection file

(async () => {
  try {
    const sql = fs
      .readFileSync(path.join(__dirname, "/queries/createTables.sql"))
      .toString();
    // return console.log(sql);
    const result = await db.query(sql);
    console.log("Tables created successfully!", result);
    process.exit(0);
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
})();
