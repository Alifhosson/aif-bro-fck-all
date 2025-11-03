const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON ফাইলের ডাটা রিড করার ফাংশন
const readJsonFile = (filename) => {
const filePath = path.join(__dirname, "data", filename);
if (fs.existsSync(filePath)) {
return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
return { error: "File not found" };
};

// API Routes


// স্পেসিফিক JSON ফাইল রিটার্ন করবে
app.get("/json/:filename", (req, res) => {
const filename = req.params.filename;
const data = readJsonFile(filename);
res.json(data);
});

// সার্ভার রান করানো
app.listen(PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`);
});
