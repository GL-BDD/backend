const db = require("./db/connections");
const bcrypt = require("bcrypt");

(async () => {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);
    const result = await db.query(
      // "insert into clients (email,username,password) values ($1,$2,$3) returning id",
      // ["c@c.com", "user3", hashedPassword]
      "select * from clients"
    );
    return console.log(result.rows);
  } catch (error) {
    console.error(error);
  }
})();
