const express = require("express");
const router = express.Router();

const {
  createApi,
  getApis,
} = require("../controllers/apiController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔹 CREATE API
router.post("/create", authMiddleware, createApi);

// 🔹 GET ALL APIs (logged-in user ke)
router.get("/", authMiddleware, getApis);

module.exports = router;    