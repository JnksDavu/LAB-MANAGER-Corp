import { getAllPosts } from "../Models/exemploModel.js";

export async function listarPosts(req, res) {
    const get = await getAllPosts();
  res.status(200).json(get);
}