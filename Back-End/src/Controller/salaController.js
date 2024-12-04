import { getAllPosts, createNewPost, atualizarPost, deletarPost, buscarSalas } from "../Models/sala.js";

export async function listarPosts(req, res) {

    const get = await getAllPosts();

  res.status(200).json(get);

}

export async function criarPost(req, res) {

  const newPost = req.body;

  try {

      const post = await createNewPost(newPost);

      res.status(200).json(post);

  } catch (erro) {

      console.error("Erro ao criar post:", erro.message);

      res.status(500).json({ "Erro": "Erro ao criar post" });

  }

}
 
export async function atualizarNovoPost(req, res) {
  const id = req.params.id;

  try {
    const { nomeSala, numeroComputadores, localizacao, possuiAcessibilidade, statusSala, softwaresInstalados } = req.body;

    if (!nomeSala || !numeroComputadores || !localizacao || typeof possuiAcessibilidade === 'undefined' || !statusSala) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const post = {
      nomeSala,
      numeroComputadores,
      localizacao,
      possuiAcessibilidade,
      statusSala,
      softwaresInstalados
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

export async function listarSalas(req, res) {
  const { nome } = req.query;

  try {
    // Montar o filtro se houver parâmetro
    const filtro = nome ? { nome: { $regex: nome, $options: "i" } } : {};

    const salas = await buscarSalas(filtro);

    res.status(200).json(salas);
  } catch (erro) {
    console.error("Erro ao listar salas:", erro.message);
    res.status(500).json({ erro: "Erro ao buscar salas" });
  }
}