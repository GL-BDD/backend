const express = require("express");
const {
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getClients);
router.get("/:id", getClientById);
router.put("/", updateClient); // client updates his profile
router.delete("/", deleteClient); // client deletes his profile
// router.put("/:id", updateClient); // should be accessed by an admin
router.delete("/:id", deleteClient); // should be accessed by an admin

module.exports = router;
