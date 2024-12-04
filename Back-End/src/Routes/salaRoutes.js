import express from 'express';
import { listarPosts, atualizarNovoPost, criarPost, deletPost, listarSalas } from "../Controller/salaController.js";

const routes = (app) => {
  app.use(express.json());

  app.get("/salas", listarSalas);
  app.get("/salas/get", listarPosts);
  app.post("/salas/create", criarPost);
  app.put("/salas/update/:id", atualizarNovoPost);
  app.delete("/salas/delete/:id", deletPost);
};

export default routes;
