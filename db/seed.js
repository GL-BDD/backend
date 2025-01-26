const db = require("./connections"); // Your database connection file
const seedData = require("./seeds.json");

async function insertData(table, data) {
  try {
    for (const row of data) {
      const columns = Object.keys(row).join(", ");
      const values = Object.values(row);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
      await db.query(query, values);
    }
    console.log(`Data inserted into ${table}`);
  } catch (err) {
    console.error(`Error inserting data into ${table}:`, err);
  }
}

// Insert all sample data
async function insertAllData() {
  for (const [table, data] of Object.entries(seedData)) {
    await insertData(table, data);
  }
}

insertAllData();
