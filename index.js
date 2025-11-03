const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ সব জায়গা থেকে অ্যাক্সেসের অনুমতি

// Root route
app.get("/", (req, res) => {
  res.send("🌐 JSON API is running publicly!");
});

// Serve JSON from /data folder
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
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
