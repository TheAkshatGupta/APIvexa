const ApiKey = require("../models/ApiKey");
const Usage = require("../models/Usage");

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ msg: "API key missing" });
    }

    const keyExists = await ApiKey.findOne({ key: apiKey });

    if (!keyExists) {
      return res.status(403).json({ msg: "Invalid API key" });
    }

    // 🔥 COUNT USAGE
    const usageCount = await Usage.countDocuments({ apiKey });



    req.apiUser = keyExists.userId;
    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};