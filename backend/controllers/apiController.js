const Api = require("../models/Api");

// 🔹 CREATE API
exports.createApi = async (req, res) => {
  try {
    const { name, baseUrl } = req.body;

    if (!name || !baseUrl) {
      return res.status(400).json({ msg: "Name and baseUrl are required" });
    }

    const api = await Api.create({
      userId: req.user.userId,
      name,
      baseUrl,
    });

    res.status(201).json({
      msg: "API created",
      api,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET ALL APIs (for logged-in user)
exports.getApis = async (req, res) => {
  try {
    const apis = await Api.find({
      userId: req.user.userId,
    });

    res.json(apis);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};