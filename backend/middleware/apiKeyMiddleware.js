const ApiKey = require("../models/ApiKey");

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

    if (keyExists.active === false) {
      return res.status(403).json({ msg: "API key revoked" });
    }

    // 🔥 IMPORTANT: NO RATE LIMIT HERE (we will add later properly)
    req.apiUser = {
      userId: keyExists.userId,
    };

    next();

  } catch (error) {
    console.log("API KEY MIDDLEWARE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};