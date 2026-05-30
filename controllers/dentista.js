import dentistaService from "../services/dentista.js";

async function listarDentistas(req, res) {
  try {
    const { nome } = req.query; 
    
    const dentistas = await dentistaService.listarDentistas(nome);
    
    if (dentistas.length === 0) {
        return res.status(404).json({ message: "Nenhum dentista encontrado com esse nome" });
    }

    res.json(dentistas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarDentista(req, res) {
  try {
    const { cpf } = req.params;
    const dentista = await dentistaService.buscarDentista(cpf);
    
    if (!dentista) {
      return res.status(404).json({ error: "Dentista não encontrado" });
    }
    
    res.json(dentista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function criarDentista(req, res) {
  try {
    const novoDentista = req.body;
    const dentista = await dentistaService.criarDentista(novoDentista);
    
    if (!dentista) {
      return res.status(400).json({ error: "CPF ou CRO já existe" });
    }
    
    res.status(201).json(dentista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editarDentista(req, res) {
  try {
    const { cpf } = req.params;
    const dadosAtualizados = req.body;
    const dentista = await dentistaService.editarDentista(cpf, dadosAtualizados);
    
    if (!dentista) {
      return res.status(404).json({ error: "Dentista não encontrado" });
    }
    
    res.json(dentista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletarDentista(req, res) {
  try {
    const { cpf } = req.params;
    const deletado = await dentistaService.deletarDentista(cpf);
    
    if (!deletado) {
      return res.status(404).json({ error: "Dentista não encontrado" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  listarDentistas,
  buscarDentista,
  criarDentista,
  editarDentista,
  deletarDentista
};