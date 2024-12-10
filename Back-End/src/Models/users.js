import run from "../config/dbconfig.js"; 
import { ObjectId } from "mongodb";

// Estabelecendo a conexão com o banco de dados
const conexao = await run(process.env.STRING_CONEXAO);


// Função para criar um novo User
export async function createNewUser(newUser) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user");
  return colecao.insertOne(newUser);
}

// Função para atualizar um User
export async function atualizarUser(id, newUser) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user");
  const objectId = new ObjectId(id); // Correção aqui
  return colecao.updateOne({ _id: objectId }, { $set: newUser });
}

// Função para deletar um User
export async function deletarUser(id) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user");
  const objectId = new ObjectId(id); // Correção aqui
  return colecao.deleteOne({ _id: objectId });
}

// Função para autenticar um usuário com base no username e senha
export async function autenticarUsuario(username, password) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user"); // Supondo que a coleção de usuários seja chamada 'usuarios'

  // Procurando um usuário com o nome de usuário e senha fornecidos
  const user = await colecao.findOne({ username, password });

  // Se o usuário for encontrado, retorna as informações do usuário
  if (user) {
    return { valid: true, user };
  } else {
    // Caso contrário, retorna uma mensagem de erro
    return { valid: false, error: "Usuário ou senha incorretos" };
  }
}

export async function getAllUsers() {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user"); // Supondo que a coleção de usuários seja chamada 'usuarios'
  
  // Buscando todos os usuários e incluindo email e senha
  return colecao.find({}, { projection: { email: 1, senha: 1 } }).toArray();
}