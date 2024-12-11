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
export async function autenticarUsuario(email, password) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user"); 

  // Procurando um usuário com o email fornecido
  const user = await colecao.findOne({ email });

  // Se o usuário for encontrado e a senha corresponder, retorna as informações do usuário
  if (user && user.senha === password) {
    return { valid: true, user };
  } else {
    // Caso contrário, retorna uma mensagem de erro
    return { valid: false, error: "Usuário ou senha incorretos" };
  }
}

export async function getAllUsers() {
  const db = conexao.db("labmanager");
  const colecao = db.collection("user"); 
  
  return colecao.find({}, { projection: { email: 1, senha: 1 } }).toArray();
}
