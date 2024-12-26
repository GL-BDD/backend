const express = require("express");
const app = express();
require("dotenv").config();
const bd = require("./db/connections");

// const artisansRoute = require("./routes/artisans");
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const artisansRoute = require("./routes/artisans");
const projectRoutes = require("./routes/projects");

app.use(express.json());
// app.use("/api/artisans", artisansRoute);
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/artisans", artisansRoute);
app.use("/api/projects", projectRoutes);
app.get("/", async (req, res) => {
  const response = await bd.query("SELECT * FROM playing_with_neon;");
  res.send(response.rows[0]);
});

const PORT = process.env.PORT || 5011;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
