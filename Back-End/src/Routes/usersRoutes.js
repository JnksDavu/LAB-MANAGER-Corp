import express from 'express';
import { listarUsers, atualizarNovoUser, criarUser, deletUser, loginUser, validarUsuario,listarUsuarios } from "../Controller/userController.js";

const routesUser = (app) => {
  app.use(express.json());
  
  // Definições das rotas de user
  app.get("/user/get", listarUsuarios);  // Aqui a rota GET para /user/get
  app.post("/user/create", criarUser);
  app.put("/user/update/:id", atualizarNovoUser);
  app.delete("/user/delete/:id", deletUser);
  app.post("/user/login", loginUser);
  app.post("/user/validar", validarUsuario);
};

export default routesUser;
