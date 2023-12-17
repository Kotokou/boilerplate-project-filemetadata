var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const app = express();

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Handle file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({ error: "No file uploaded." });
  }

  // Access file information
  const fileName = file.originalname;
  const fileType = file.mimetype;
  const fileSize = file.size;

  // Respond with file information in JSON
  res.json({ name: fileName, type: fileType, size: fileSize });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
