const express = require("express");
const app = express();
require("dotenv").config();
const bd = require("./db/connections");

// const artisansRoute = require("./routes/artisans");
const authroutes = require("./routes/auth");

app.use(express.json());
// app.use("/api/artisans", artisansRoute);
app.use("/api/auth", authroutes);

app.get("/", async (req, res) => {
  const response = await bd.query("SELECT * FROM playing_with_neon;");
  res.send(response.rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
