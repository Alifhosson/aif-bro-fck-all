const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 আপনার সিক্রেট API Key (নিজের মতো করে পরিবর্তন করুন)
const SECRET_KEY = "UCA_SUPER_SECRET_12345";

// 🟢 allow CORS
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("🌐 Protected JSON API is running!");
});

// 🔐 Protected JSON route
app.get("/data/:filename", (req, res) => {
  const apiKey = req.headers["x-api-key"];

  // যদি API key না থাকে বা key ভুল হয় → Access Denied
  if (apiKey !== SECRET_KEY) {
    return res.status(403).json({ error: "Access Denied" });
  }

  const filename = req.params.filename;
  const filePath = path.join(__dirname, "data", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Secure server running at http://localhost:${PORT}`);
});
