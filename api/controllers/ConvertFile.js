import docxToPDF from "docx-pdf";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = (req, res, next) => {
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
};
