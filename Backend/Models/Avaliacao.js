import mongoose from "../db.js";

const AvaliacaoSchema = new mongoose.Schema({
  receita_id: { type: mongoose.Schema.Types.ObjectId, ref: "Receita" },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  nota: Number,
});

export default mongoose.model("Avaliacao", AvaliacaoSchema);