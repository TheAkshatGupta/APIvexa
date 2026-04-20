const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(require("cors")());

app.get("/", (req, res) => {
  res.send("APIvexa Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});