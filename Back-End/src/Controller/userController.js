import User from '../Models/users.js';
import jwt from 'jsonwebtoken';
import { criptografar, descriptografar } from '../Utils/Utils.js';
import { updateToken, getToken } from './tokenController.js';

const SECRET_KEY_LOGIN = 'secret'; // Para autenticação de login
const SECRET_KEY_GENERAL = 'your_secret_key'; // Para o token geral

// Criar um novo usuário
export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Criptografar a senha
    const senhaCriptografada = criptografar(password);

    // Criar o usuário com a senha criptografada
    const newUser = await User.create({ email, password: senhaCriptografada });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter um usuário específico por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar usuário por ID
export const updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.email = email;

      // Criptografar a senha antes de salvar
      user.password = criptografar(password);

      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um usuário por ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: `Usuário ${req.params.id} excluído com sucesso!` });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login do usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário ou senha incorretos' });
    }

    // Verificar a senha
    const senhaCriptografada = criptografar(password);

    if (user.email === email && descriptografar(user.password) === password) {
      const token = jwt.sign({ email }, SECRET_KEY_LOGIN, { expiresIn: '5h' });
      res.json({ token });
    } else {
      res.status(404).json({ message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Middleware para autenticar o token de login
export const authenticateTokenLogin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token necessário' });

  jwt.verify(token, SECRET_KEY_LOGIN, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Middleware para autenticar o token geral
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token necessário' });

  const storedToken = getToken();

  if (token !== storedToken) return res.status(403).json({ message: 'Token inválido' });

  try {
    jwt.verify(token, SECRET_KEY_GENERAL);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};
