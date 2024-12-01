import Sala from '../Models/sala.js'; 

export const createSala = async (req, res) => {
  try {
    const { nomeSala, numeroComputadores, localizacao, possuiAcessibilidade, statusSala, softwaresInstalados } = req.body;

    const novaSala = await Sala.create({ 
      nomeSala, 
      numeroComputadores, 
      localizacao, 
      possuiAcessibilidade, 
      statusSala, 
      softwaresInstalados 
    });

    res.status(201).json(novaSala);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll();
    res.status(200).json(salas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSalaById = async (req, res) => {
  try {
    const sala = await Sala.findByPk(req.params.id);
    if (sala) {
      res.status(200).json(sala);
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateSala = async (req, res) => {
  try {
    const { nomeSala, numeroComputadores, localizacao, possuiAcessibilidade, statusSala, softwaresInstalados } = req.body;
    const sala = await Sala.findByPk(req.params.id);

    if (sala) {
      sala.nomeSala = nomeSala || sala.nomeSala;
      sala.numeroComputadores = numeroComputadores || sala.numeroComputadores;
      sala.localizacao = localizacao || sala.localizacao;
      sala.possuiAcessibilidade = (possuiAcessibilidade !== undefined) ? possuiAcessibilidade : sala.possuiAcessibilidade;
      sala.statusSala = statusSala || sala.statusSala;
      sala.softwaresInstalados = softwaresInstalados || sala.softwaresInstalados;

      await sala.save();
      res.status(200).json(sala);
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSala = async (req, res) => {
  try {
    const sala = await Sala.findByPk(req.params.id);
    if (sala) {
      await sala.destroy();
      res.status(200).json({ message: `Sala ${req.params.id} excluída com sucesso!` });
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSoftwaresInstalados = async (req, res) => {
  try {
    const sala = await Sala.findByPk(req.params.id);
    if (sala) {
      res.status(200).json({ softwaresInstalados: sala.softwaresInstalados });
    } else {
      res.status(404).json({ message: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
