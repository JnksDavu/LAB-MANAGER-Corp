// import express from 'express';
// import {
//   createUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   loginUser,
//   authenticateTokenLogin,
//   authenticateToken
// } from '../Controller/userController.js';

// const router = express.Router();

// router.post('/create',authenticateToken,createUser);
// router.get('/', authenticateToken,getAllUsers);
// router.get('/:id', authenticateToken,getUserById);
// router.put('/:id', authenticateToken,updateUser);
// router.delete('/:id', authenticateToken,deleteUser);
// router.post('/login',loginUser);

// export default router;

import express from 'express';
import { listarPosts, atualizarNovoPost, criarPost, deletPost, loginUser, authenticateToken, authenticateTokenLogin } from "../Controller/userController.js";

const routes = (app) => {
  app.use(express.json());
  app.get("/user/get", listarPosts);
  app.get("/user/create", criarPost);
  app.get("/user/update", atualizarNovoPost);
  app.get("/user/delete", deletPost);
  app.get("/user/login", loginUser);
};

export default routes;
