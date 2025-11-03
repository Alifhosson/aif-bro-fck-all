const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send("JSON API is running...");
});

// JSON Serve from /data folder
app.get("/data/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "data", filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
