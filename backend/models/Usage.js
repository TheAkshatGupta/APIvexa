const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema(
  {
    apiKey: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
    },
    status: {
      type: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usage", usageSchema);