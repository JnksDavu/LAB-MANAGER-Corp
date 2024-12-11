import express from 'express';
import {  atualizarNovoUser, criarUser, deletUser, loginUser,listarUsers } from "../Controller/userController.js";

const routesUser = (app) => {
  app.use(express.json());
  
  // Definições das rotas de user
  app.get("/user/get", listarUsers);  // Aqui a rota GET para /user/get
  app.post("/user/create", criarUser);
  app.put("/user/update/:id", atualizarNovoUser);
  app.delete("/user/delete/:id", deletUser);
  app.post("/user/login", loginUser);
  app.post("/user/validar", loginUser);
};

export default routesUser;
