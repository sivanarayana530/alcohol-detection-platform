const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Alcohol Detection Backend Running");
});

app.get("/api/news", async (req, res) => {
  const API_KEY = "195061421e85426c9c02a18723c41c9a";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=drunk%20driving&language=en&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
