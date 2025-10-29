import fs from "fs";
import path from "path";

const dataPath = path.resolve("Backend/data/receitas.json");

export const getReceitas = (req, res) => {
  try {
    const receitas = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao carregar receitas" });
  }
};

export const addReceita = (req, res) => {
  try {
    const receitas = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const novaReceita = { id: Date.now(), ...req.body };
    receitas.push(novaReceita);
    fs.writeFileSync(dataPath, JSON.stringify(receitas, null, 2));
    res.status(201).json(novaReceita);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar receita" });
  }
};
