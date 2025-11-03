import mongoose from "../db.js";

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  profile_picture: { type: String, default: "" },
});

export default mongoose.model("Usuario", UsuarioSchema);