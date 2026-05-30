import {
  listarDentistas as listarDentistasService,
  buscarDentista as buscarDentistaService,
  criarDentista as criarDentistaService,
  editarDentista as editarDentistaService,
  deletarDentista as deletarDentistaService
} from '../services/dentista.js';

function listarDentistas(req, res) {
  const dentistas = listarDentistasService();
  res.json(dentistas);
}

function buscarDentista(req, res) {
  const { cpf } = req.params;
  const dentista = buscarDentistaService(cpf);
  
  if (!dentista) {
    return res.status(404).json({ error: "Dentista não encontrado" });
  }
  
  res.json(dentista);
}

function criarDentista(req, res) {
  const novoDentista = req.body;
  const dentista = criarDentistaService(novoDentista);
  
  if (!dentista) {
    return res.status(400).json({ error: "CPF ou CRO já existe" });
  }
  
  res.status(201).json(dentista);
}

function editarDentista(req, res) {
  const { cpf } = req.params;
  const dadosAtualizados = req.body;
  const dentista = editarDentistaService(cpf, dadosAtualizados);
  
  if (!dentista) {
    return res.status(404).json({ error: "Dentista não encontrado" });
  }
  
  res.json(dentista);
}

function deletarDentista(req, res) {
  const { cpf } = req.params;
  const deletado = deletarDentistaService(cpf);
  
  if (!deletado) {
    return res.status(404).json({ error: "Dentista não encontrado" });
  }
  
  res.status(204).send();
}

export {
  listarDentistas,
  buscarDentista,
  criarDentista,
  editarDentista,
  deletarDentista
};