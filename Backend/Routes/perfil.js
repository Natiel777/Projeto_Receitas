import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import auth from "../Middlewares/auth.js";
import Usuario from "../Models/Usuario.js";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
const upload = multer();

// Editar perfil
router.put("/editar", auth, upload.single("profilePicture"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream({ folder: "usuarios" }, (err, result) => err ? reject(err) : resolve(result));
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = uploadResult.secure_url;
    }

    const updatedUser = await Usuario.findByIdAndUpdate(
      req.user.id,
      { nome: req.body.nome, profile_picture: imageUrl },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
});

// Excluir conta
router.delete("/excluir", auth, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.user.id);
    res.json({ message: "Conta excluída com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir conta" });
  }
});

export default router;