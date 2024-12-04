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

const user = await colecao.findOne({ username, password });

  if (user) {
    return { valid: true, user };
  } else {
    return { valid: false, error: "Usuário ou senha incorretos" };
  }