const dentistaService = require("../services/dentista");

function listarDentistas(req, res) {
  const dentistas = dentistaService.listarDentistas();
  res.json(dentistas);
}

function buscarDentista(req, res) {
  const { cpf } = req.params;
  const dentista = dentistaService.buscarDentista(cpf);
  
  if (!dentista) {
    return res.status(404).json({ error: "Dentista não encontrado" });
  }
  
  res.json(dentista);
}

function criarDentista(req, res) {
  const novoDentista = req.body;
  const dentista = dentistaService.criarDentista(novoDentista);
  
  if (!dentista) {
    return res.status(400).json({ error: "CPF ou CRO já existe" });
  }
  
  res.status(201).json(dentista);
}

function editarDentista(req, res) {
  const { cpf } = req.params;
  const dadosAtualizados = req.body;
  const dentista = dentistaService.editarDentista(cpf, dadosAtualizados);
  
  if (!dentista) {
    return res.status(404).json({ error: "Dentista não encontrado" });
  }
  
  res.json(dentista);
}

function deletarDentista(req, res) {
  const { cpf } = req.params;
  const deletado = dentistaService.deletarDentista(cpf);
  
  if (!deletado) {
    return res.status(404).json({ error: "Dentista não encontrado" });
  }
  
  res.status(204).send();
}

module.exports = {
  listarDentistas,
  buscarDentista,
  criarDentista,
  editarDentista,
  deletarDentista
};