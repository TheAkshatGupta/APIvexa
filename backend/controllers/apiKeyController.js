const ApiKey = require("../models/ApiKey");
const crypto = require("crypto");

// 🔹 CREATE API KEY
exports.createKey = async (req, res) => {
  try {
    const userId = req.user.userId;

    const key = crypto.randomBytes(24).toString("hex");

    const apiKey = await ApiKey.create({
      userId,
      key,
      name: "My Key",
      active: true,
    });

    res.status(201).json({
      msg: "API key created",
      key: apiKey.key,
      id: apiKey._id,
    });
  } catch (error) {
    console.log("CREATE KEY ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET ALL KEYS
exports.getKeys = async (req, res) => {
  try {
    const keys = await ApiKey.find({
      userId: req.user.userId,
      active: true, // 🔥 only active keys
    });

    res.json(keys);
  } catch (error) {
    console.log("GET KEYS ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 🔹 REVOKE KEY
exports.revokeKey = async (req, res) => {
  try {
    const { keyId } = req.params;

    const key = await ApiKey.findOneAndUpdate(
      { _id: keyId, userId: req.user.userId },
      { active: false },
      { new: true }
    );

    if (!key) {
      return res.status(404).json({ msg: "API key not found" });
    }

    res.json({ msg: "API key revoked" });
  } catch (error) {
    console.log("REVOKE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};