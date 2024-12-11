const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = 5000; // Choose your preferred port

app.get("/news", async (req, res) => {
  const { category, page } = req.query;
  const apiKey = "82b44f438abb486f9f4dffb2e0ac11c6"; // Your API key
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
