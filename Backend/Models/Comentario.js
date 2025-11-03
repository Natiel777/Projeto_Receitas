import mongoose from "../db.js";

const ComentarioSchema = new mongoose.Schema({
  receita_id: { type: mongoose.Schema.Types.ObjectId, ref: "Receita" },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  usuario_nome: String,
  texto: String,
  criado_em: { type: Date, default: Date.now },
});

export default mongoose.model("Comentario", ComentarioSchema);