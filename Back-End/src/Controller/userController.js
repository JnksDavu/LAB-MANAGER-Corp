import { createNewUser, atualizarUser, deletarUser, getAllUsers } from "../Models/users.js";
import jwt from 'jsonwebtoken';
import { updateToken, getToken } from './tokenController.js';
import { autenticarUsuario } from '../Models/users.js'; // Importando a função de autenticação

const SECRET_KEY_LOGIN = 'secret'; // Para autenticação de login
const SECRET_KEY_GENERAL = 'your_secret_key'; // Para o token geral

// Função para listar todos os Users
export async function listarUsers(req, res) {
  const get = await getAllUsers();
  res.status(200).json(get);
}

export async function listarUsuarios(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro.message);
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
}

// Função para criar um novo User
export async function criarUser(req, res) {
  const newUser = req.body;

  // Verifique se todos os campos obrigatórios foram preenchidos
  if (!newUser.nome || !newUser.email || !newUser.senha) {
    return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    // Crie o usuário no banco de dados
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

    const User = {
      nome,
      senha
    };

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

    // Tenta encontrar o usuário no banco de dados
    const user = await autenticarUsuario(email);

    // Se o usuário não for encontrado, retorna erro
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Compara a senha fornecida com a senha armazenada no banco
    if (user.senha !== password) {
      return res.status(401).json({ message: 'Login ou senha incorretos.' });
    }

    // Gerar o token JWT se as credenciais estiverem corretas
    const token = jwt.sign({ email, id: user._id }, SECRET_KEY_LOGIN, { expiresIn: '5h' });
    return res.json({ token });

  } catch (error) {
    console.error("Erro ao autenticar usuário:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Middleware de autenticação com token para login
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

// Middleware de autenticação com token geral
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token necessário' });

  jwt.verify(token, SECRET_KEY_GENERAL, (err) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado' });
    next();
  });
}

// Função para validar um usuário
export async function validarUsuario(req, res) {
  try {
    const { email, password } = req.body;

    // Verificando se os dados foram passados corretamente
    console.log('Dados recebidos:', { email, password });

    // Verifica se o email ou a senha não foram passados
    if (!email || !password) {
      console.log('Erro: Dados incompletos');
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    // Verificar o usuário no banco de dados
    const user = await UserModel.findOne({ email: email });
    
    if (!user) {
      console.log('Erro: Usuário não encontrado');
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Verificando a senha
    if (user.senha !== password) {
      console.log('Erro: Senha incorreta');
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Se tudo estiver certo, retorna sucesso
    console.log('Usuário validado com sucesso');
    return res.status(200).json({ message: "Usuário validado com sucesso." });

  } catch (error) {
    // Captura e loga o erro
    console.error('Erro ao validar usuário:', error);
    return res.status(500).json({ error: "Erro ao validar usuário." });
  }
}


