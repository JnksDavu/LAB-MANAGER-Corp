import { createNewUser, atualizarUser, deletarUser, getAllUsers, autenticarUsuario } from "../Models/users.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY_LOGIN = 'secret'; // Para autenticação de login
const SECRET_KEY_GENERAL = 'your_secret_key'; // Para o token geral

// Função para listar todos os Users
export async function listarUsers(req, res) {
  try {
    const get = await getAllUsers();
    res.status(200).json(get);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro.message);
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
}

// Função para criar um novo User
export async function criarUser(req, res) {
  const newUser = req.body;

  if (!newUser.nome || !newUser.email || !newUser.senha) {
    return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const User = await createNewUser(newUser);
    res.status(200).json(User);
  } catch (erro) {
    console.error("Erro ao criar User:", erro.message);
    res.status(500).json({ "Erro": "Erro ao criar User" });
  }
}

// Função para atualizar um User
export async function atualizarNovoUser(req, res) {
  const id = req.params.id;

  try {
    const { nome, senha } = req.body;

    if (!nome || !senha ) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const User = { nome, senha };
    const UserNovo = await atualizarUser(id, User); 

    res.status(200).json(UserNovo);
  } catch (erro) {
    console.error("Erro ao atualizar User:", erro.message);
    res.status(500).json({ erro: "Erro ao atualizar o User" });
  }
}

// Função para deletar um User
export async function deletUser(req, res) {
  const id = req.params.id;
 
  try {
    const resultado = await deletarUser(id);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ "Erro": "User não encontrado" });
    }

    res.status(200).json({ "Mensagem": "User deletado com sucesso" });

  } catch (erro) {
    console.error("Erro ao deletar User:", erro.message);
    res.status(500).json({ "Erro": "Erro ao deletar User" });
  }
}

// Função para login de usuário
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Verifica se o e-mail foi informado
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Tenta autenticar o usuário com base no email e senha
    const { valid, user, error } = await autenticarUsuario(email, password);

    // Se o usuário não for encontrado ou a senha for incorreta
    if (!valid) {
      return res.status(401).json({ message: error || 'Login ou senha incorretos.' });
    }

    // Gerar o token JWT se as credenciais estiverem corretas
    const token = jwt.sign({ email, id: user._id }, SECRET_KEY_LOGIN, { expiresIn: '5h' });
    return res.json({ token });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Middleware de autenticação com token
export function authenticateTokenLogin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token necessário' });

  jwt.verify(token, SECRET_KEY_LOGIN, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}
