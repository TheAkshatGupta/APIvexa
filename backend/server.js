const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

// 🔹 DB connect
const connectDB = require("./config/db");
connectDB();

// 🔹 Models
const Usage = require("./models/Usage");
const ApiKey = require("./models/ApiKey");

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const apiKeyRoutes = require("./routes/apiKeyRoutes");
app.use("/api/keys", apiKeyRoutes);

// 🔹 Middlewares
const apiKeyMiddleware = require("./middleware/apiKeyMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

// 🔹 Protected Route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "Protected route accessed ✅",
    user: req.user,
  });
});

// 🔹 Gateway Test Route
app.get("/api/gateway/test", apiKeyMiddleware, (req, res) => {
  res.json({
    msg: "Gateway access granted ✅",
    user: req.apiUser,
  });
});

// 🔹 GET USAGE COUNT
app.get("/api/usage", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const keys = await ApiKey.find({ userId });
    const keyList = keys.map(k => k.key);

    const count = await Usage.countDocuments({
      apiKey: { $in: keyList }
    });

    res.json({
      totalRequests: count,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔥 REAL API PROXY + USAGE LOGGING
app.get("/api/gateway/pokemon/:name", apiKeyMiddleware, async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  const endpoint = req.originalUrl;

  try {
    const { name } = req.params;

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    // ✅ SAVE SUCCESS LOG
    await Usage.create({
      apiKey,
      endpoint,
      status: 200,
    });

    res.json({
      msg: "Data fetched via APIvexa Gateway 🚀",
      data: response.data,
    });

  } catch (error) {

    // ❌ SAVE ERROR LOG
    await Usage.create({
      apiKey,
      endpoint,
      status: 500,
    });

    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 🔥 BILLING API
app.get("/api/billing", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const keys = await ApiKey.find({ userId });
    const keyList = keys.map(k => k.key);

    const totalRequests = await Usage.countDocuments({
      apiKey: { $in: keyList }
    });

    // 🔥 PRICING
    let cost = 0;

    if (totalRequests > 5) {
      const extra = totalRequests - 5;
      cost = extra * 0.01; // ₹0.01 per request
    }

    res.json({
      totalRequests,
      freeLimit: 5,
      payableRequests: totalRequests > 5 ? totalRequests - 5 : 0,
      totalCost: `₹${cost.toFixed(2)}`
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("APIvexa Backend Running 🚀");
});

// 🔹 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});