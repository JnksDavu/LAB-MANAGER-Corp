import run from "../config/dbconfig.js"; 

const conexao = await run(process.env.STRING_CONEXAO);

export async function getAllPosts() {
  const db = conexao.db("labmanager");
  const colecao = db.collection("sala");
  return colecao.find().toArray();
}

export async function createNewPost(newPost) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("sala");
  return colecao.insertOne(newPost);
}

export async function atualizarPost(id, newPost) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("sala");
  const objectId = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objectId)}, {$set: newPost});
}

export async function deletarPost(id) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("sala");
  const objectId = ObjectId.createFromHexString(id);

  return colecao.deleteOne({ _id: new ObjectId(objectId) });
}

export async function buscarSalas(filtro = {}) {
  const db = conexao.db("labmanager");
  const colecao = db.collection("sala");

  return colecao.find(filtro).toArray();
}
