import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("Conectado ao MongoDB Atlas"));
mongoose.connection.on("error", (err) => console.error("Erro ao conectar ao MongoDB:", err));

export default mongoose;