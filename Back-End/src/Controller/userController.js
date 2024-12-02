// import User from '../Models/users.js';
// import jwt from 'jsonwebtoken';
// import { criptografar, descriptografar } from '../Utils/Utils.js';
// import { updateToken, getToken } from './tokenController.js';

// const SECRET_KEY_LOGIN = 'secret'; // Para autenticação de login
// const SECRET_KEY_GENERAL = 'your_secret_key'; // Para o token geral

// // Criar um novo usuário
// export const createUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Criptografar a senha
//     const senhaCriptografada = criptografar(password);

//     // Criar o usuário com a senha criptografada
//     const newUser = await User.create({ email, password: senhaCriptografada });

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Obter todos os usuários
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Obter um usuário específico por ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'Usuário não encontrado' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Atualizar usuário por ID
// export const updateUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByPk(req.params.id);

//     if (user) {
//       user.email = email;

//       // Criptografar a senha antes de salvar
//       user.password = criptografar(password);

//       await user.save();
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'Usuário não encontrado' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Deletar um usuário por ID
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       await user.destroy();
//       res.status(200).json({ message: `Usuário ${req.params.id} excluído com sucesso!` });
//     } else {
//       res.status(404).json({ message: 'Usuário não encontrado' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Login do usuário
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: 'Usuário ou senha incorretos' });
//     }

//     // Verificar a senha
//     const senhaCriptografada = criptografar(password);

//     if (user.email === email && descriptografar(user.password) === password) {
//       const token = jwt.sign({ email }, SECRET_KEY_LOGIN, { expiresIn: '5h' });
//       res.json({ token });
//     } else {
//       res.status(404).json({ message: 'Usuário ou senha incorretos' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Middleware para autenticar o token de login
// export const authenticateTokenLogin = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.status(401).json({ message: 'Token necessário' });

//   jwt.verify(token, SECRET_KEY_LOGIN, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Token inválido' });
//     req.user = user;
//     next();
//   });
// };

// // Middleware para autenticar o token geral
// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Token necessário' });

//   const storedToken = getToken();

//   if (token !== storedToken) return res.status(403).json({ message: 'Token inválido' });

//   try {
//     jwt.verify(token, SECRET_KEY_GENERAL);
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Token inválido ou expirado' });
//   }
// };
import { getAllPosts, createNewPost, atualizarPost, deletarPost } from "../Models/users.js";
import jwt from 'jsonwebtoken';
import { criptografar, descriptografar } from '../Utils/Utils.js';
import { updateToken, getToken } from './tokenController.js';

const SECRET_KEY_LOGIN = 'secret'; // Para autenticação de login
const SECRET_KEY_GENERAL = 'your_secret_key'; // Para o token geral

export async function listarPosts(req, res) {

    const get = await getAllPosts();

  res.status(200).json(get);

}

export async function criarPost(req, res) {

  const newPost = req.body;

  try {

      const post = await createNewPost(newPost);

      // Criptografar a senha
      const senhaCriptografada = criptografar(post.senha);

      post.senha = senhaCriptografada;

      res.status(200).json(post);

  } catch (erro) {

      console.error("Erro ao criar post:", erro.message);

      res.status(500).json({ "Erro": "Erro ao criar post" });

  }

}
 
export async function atualizarNovoPost(req, res) {
  const id = req.params.id;

  try {
    const { nome, senha } = req.body;

    if (!nome || !senha ) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Criptografar a senha
    const senhaCriptografada = criptografar(senha);

    const post = {
      nome,
      senhaCriptografada
    };

    const postNovo = await atualizarPost(id, post); 

    res.status(200).json(postNovo);

  } catch (erro) {
    console.error("Erro ao atualizar post:", erro.message);
    res.status(500).json({ erro: "Erro ao atualizar o post" });
  }
}

 
export async function deletPost(req, res) {

  const id = req.params.id;
 
    try {

        const resultado = await deletarPost(id);
 
        if (resultado.deletedCount === 0) {

            return res.status(404).json({ "Erro": "Post não encontrado" });

        }

        res.status(200).json({ "Mensagem": "Post deletado com sucesso" });

    } catch (erro) {

        console.error("Erro ao deletar post:", erro.message);

        res.status(500).json({ "Erro": "Erro ao deletar post" });

    }

}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });  // Ajuste conforme a estrutura do seu modelo

    if (!user) {
      return res.status(404).json({ message: 'Usuário ou senha incorretos' });
    }

    // Verificar a senha
    if (descriptografar(user.password) === password) {
      const token = jwt.sign({ email, id: user.id }, SECRET_KEY_LOGIN, { expiresIn: '5h' });
      return res.json({ token });
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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

// Middleware adicional, se necessário:
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token necessário' });

  jwt.verify(token, SECRET_KEY_GENERAL, (err) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado' });
    next();
  });
}
