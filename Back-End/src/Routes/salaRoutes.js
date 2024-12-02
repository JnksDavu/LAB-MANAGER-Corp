import express from 'express';
import {
  createSala,
  getAllSalas,
  getSalaById,
  updateSala,
  deleteSala,
  getSoftwaresInstalados
} from '../Controller/salaController.js';
import { authenticateToken } from '../Controller/userController.js';

const routes = (app) => {
  app.use(express.json());

  app.post('/salas/create', authenticateToken, createSala);
  app.get('/salas', authenticateToken, getAllSalas);
  app.get('/salas/:id', authenticateToken, getSalaById);
  app.put('/salas/:id', authenticateToken, updateSala);
  app.delete('/salas/:id', authenticateToken, deleteSala);
  app.get('/salas/:id/softwares', authenticateToken, getSoftwaresInstalados);
};

export default routes;
