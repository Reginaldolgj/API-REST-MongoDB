import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros/busca", LivroController.listarLivroPorEditora)
    .get("/livros", LivroController.listarLivros)
    .get("/livros/:id", LivroController.listarTodosLivros)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.excluirLivro)

export default router;