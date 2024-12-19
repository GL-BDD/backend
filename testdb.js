const db = require("./db/connections");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const createTables = fs.readFileSync(
  path.join(__dirname, "./db/queries/createTables.sql"),
  "utf8"
);
(async () => {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);
    const result = await db.query(createTables);
    return console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
