/**
 * Main server entry point, sets up routes and starts listening.
 */
const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

// const artisansRoute = require("./routes/artisans");
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const artisansRoute = require("./routes/artisans");
const projectRoutes = require("./routes/projects.js");
const quoteRoutes = require("./routes/quotes");
const acceptedProjectRoutes = require("./routes/acceptedProject");

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// app.post("/*", function (req, res, next) {
//   console.log(req.method, req.url);
//   console.log(req.body);
//   console.log(req.files);
//   next();
// });
// app.use("/api/artisans", artisansRoute);
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/artisans", artisansRoute);
app.use("/api/projects", projectRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/acceptedProject", acceptedProjectRoutes);
app.get("/", async (req, res) => {
  res.send("hello from server");
});

const PORT = process.env.PORT || 5011;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
