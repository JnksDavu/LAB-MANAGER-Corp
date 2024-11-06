import express from 'express';
import { getToken } from '../Controller/tokenController.js'; // Certifique-se de que o caminho está correto

const router = express.Router();

// Rota para obter o token geral
router.get('/', (req, res) => {
  const token = getToken();
  res.json({ token });
});

export default router;