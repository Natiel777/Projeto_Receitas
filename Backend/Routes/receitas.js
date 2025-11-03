import express from "express";
import auth from "../Middlewares/auth.js";
import Receita from "../Models/Receita.js";
import Avaliacao from "../Models/Avaliacao.js";
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
const upload = multer();

// Criar receita
router.post("/", auth, upload.single("imagem"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream({ folder: "receitas" }, (err, result) => err ? reject(err) : resolve(result));
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = uploadResult.secure_url;
    }

    const receita = await Receita.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      imagem: imageUrl,
      autorId: req.user.id
    });

    res.json(receita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar receita" });
  }
});

// Listar receitas com média de avaliações
router.get("/", async (req, res) => {
  try {
    const receitas = await Receita.find().populate("autorId", "nome profile_picture");
    const results = await Promise.all(receitas.map(async r => {
      const avaliacoes = await Avaliacao.find({ receita_id: r._id });
      const media = avaliacoes.length > 0 ? (avaliacoes.reduce((a,b)=>a+b.nota,0)/avaliacoes.length).toFixed(1) : 0;
      return { ...r.toObject(), media };
    }));
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar receitas" });
  }
});

// Avaliar receita
router.post("/:id/avaliar", auth, async (req, res) => {
  try {
    const { nota } = req.body;
    let avaliacao = await Avaliacao.findOne({ receita_id: req.params.id, usuario_id: req.user.id });
    if (avaliacao) {
      avaliacao.nota = nota;
      await avaliacao.save();
    } else {
      avaliacao = await Avaliacao.create({ receita_id: req.params.id, usuario_id: req.user.id, nota });
    }
    res.json(avaliacao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao avaliar receita" });
  }
});

export default router;