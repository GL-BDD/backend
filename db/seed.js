const fs = require("fs");
const path = require("path");
const db = require("./connections"); // Your database connection file

(async () => {
  try {
    const seedSql = fs
      .readFileSync(path.join(__dirname, "seedData.sql"))
      .toString();
    await db.query(seedSql);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
})();
