import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("Backend/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, nome);
  }
});

export const upload = multer({ storage });