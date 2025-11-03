import mongoose from "../db.js";

const ReceitaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  imagem: String,
  autorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  criado_em: { type: Date, default: Date.now },
});

export default mongoose.model("Receita", ReceitaSchema);