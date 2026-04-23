const ApiKey = require("../models/ApiKey");
const crypto = require("crypto");

// 🔹 CREATE API KEY
exports.createKey = async (req, res) => {
  try {
    const userId = req.user.userId; // middleware se aayega

    // random key generate
    const key = crypto.randomBytes(24).toString("hex");

    const apiKey = await ApiKey.create({
      userId,
      key,
      name: "My Key",
    });

    res.status(201).json({
      msg: "API key created",
      key: apiKey.key,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};