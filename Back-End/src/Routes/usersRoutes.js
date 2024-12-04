import express from 'express';
import { listarPosts, atualizarNovoPost, criarPost, deletPost, loginUser, authenticateToken, authenticateTokenLogin, validarUsuario } from "../Controller/userController.js";

const routes = (app) => {
  app.use(express.json());
  app.get("/user/get", listarPosts);
  app.get("/user/create", criarPost);
  app.get("/user/update", atualizarNovoPost);
  app.get("/user/delete", deletPost);
  app.get("/user/login", loginUser);
  app.get("/user/validar", validarUsuario);
};

export default routes;
