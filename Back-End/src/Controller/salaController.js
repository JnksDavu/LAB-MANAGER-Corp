// controllers/salaController.js

import { createSala, findAllSalas, findSalaById, updateSala, deleteSala } from '../Models/sala.js';

// Criar uma nova sala
export async function criarSala(req, res) {
  try {
    const novaSala = await createSala(req.body);
    res.status(201).json(novaSala);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Listar todas as salas
export async function listarSalas(req, res) {
  try {
    const salas = await findAllSalas();
    res.status(200).json(salas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obter sala por ID
export async function obterSalaPorId(req, res) {
  try {
    const sala = await findSalaById(req.params.id);
    if (sala) {
      res.status(200).json(sala);
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Atualizar uma sala
export async function atualizarSala(req, res) {
  try {
    const salaAtualizada = await updateSala(req.params.id, req.body);
    if (salaAtualizada) {
      res.status(200).json(salaAtualizada);
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Deletar uma sala
export async function deletarSala(req, res) {
  try {
    const salaDeletada = await deleteSala(req.params.id);
    if (salaDeletada) {
      res.status(200).json({ message: 'Sala excluída com sucesso!' });
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
