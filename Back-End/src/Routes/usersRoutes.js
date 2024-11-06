import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  authenticateTokenLogin,
  authenticateToken
} from '../Controller/userController.js';

const router = express.Router();

router.post('/create',authenticateToken,createUser);
router.get('/', authenticateToken,getAllUsers);
router.get('/:id', authenticateToken,getUserById);
router.put('/:id', authenticateToken,updateUser);
router.delete('/:id', authenticateToken,deleteUser);
router.post('/login',loginUser);

export default router;
