// import { Sequelize, DataTypes } from 'sequelize';
// import dotenv from 'dotenv';
// import conectarAoBanco from "../config/dbconfig.js";

// const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.STRING,
//     autoIncrement: true, // Gera automaticamente IDs incrementais
//     primaryKey: true,    // Define como chave primária
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// }, {
//   tableName: 'usuarios',
//   timestamps: true, 
//   createdAt: 'createdat',  
//   updatedAt: 'updatedat',  
// });

// export default User;


import run from "../config/dbconfig.js"; 

const conexao = await run(process.env.STRING_CONEXAO);

export async function getAllPosts() {
  const db = conexao.db("labmanager");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export async function createNewPost(newPost) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("posts");
  return colecao.insertOne(newPost);
}

export async function atualizarPost(id, newPost) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("posts");
  const objectId = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objectId)}, {$set: newPost});
}

export async function deletarPost(id) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("posts");
  const objectId = ObjectId.createFromHexString(id);

  return colecao.deleteOne({ _id: new ObjectId(objectId) });
}