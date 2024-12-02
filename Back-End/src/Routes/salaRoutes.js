import express from 'express';
import { listarPosts, atualizarNovoPost, criarPost, deletPost } from "../Controller/salaController.js";

const routes = (app) => {
  app.use(express.json());
  app.get("/salas/get", listarPosts);
  app.get("/salas/create", criarPost);
  app.get("/salas/update", atualizarNovoPost);
  app.get("/salas/delete", deletPost);
};

export default routes;
