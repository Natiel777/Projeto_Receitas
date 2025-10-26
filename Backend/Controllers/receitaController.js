import receitas from "../data/receitas.js";

export const listarReceitas = (req, res) => {
    res.json(receitas);
};

export const obterReceitaPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const receita = receitas.find(r => r.id === id);

    if (!receita) {
        return res.status(404).json({ mensagem: "Receita não encontrada" });
    }

    res.json(receita);
};
