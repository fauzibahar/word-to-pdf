import express from "express";
import multer from "multer";
import cors from "cors";
import docxToPDF from "docx-pdf";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome To Word to PDF API");
});

// settting up the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/convertFile", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file  uploaded",
      });
    }
    // Defining outout file path
    let outoutPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`);
    docxToPDF(req.file.path, outoutPath, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error converting docx to pdf",
        });
      }
      res.download(outoutPath, () => {
        console.log("file downloaded");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
