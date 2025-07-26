
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

let alcoholLevel = 45;
let ignitionLocked = alcoholLevel > 40;

app.get("/", (req, res) => {
  res.send("🚗 Alcohol Detection API running. Try /status.");
});

app.get("/status", (req, res) => {
  res.json({ alcoholLevel, ignitionLocked });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
