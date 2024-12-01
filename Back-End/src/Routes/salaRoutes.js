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

const router = express.Router();
router.post('/create', authenticateToken, createSala);
router.get('/', authenticateToken, getAllSalas);
router.get('/:id', authenticateToken, getSalaById);
router.put('/:id', authenticateToken, updateSala);
router.delete('/:id', authenticateToken, deleteSala);
router.get('/:id/softwares', authenticateToken, getSoftwaresInstalados);

export default router;
