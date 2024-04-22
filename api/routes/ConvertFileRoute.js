import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/ConvertFile.js";

const router = express.Router();

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

router.post("/convertFile", upload.single("file"), uploadFile);

export default router;
