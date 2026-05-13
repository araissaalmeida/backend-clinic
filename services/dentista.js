const fs = require("fs");
const path = require("path");

const caminhoBanco = path.join(__dirname, "../database/dentista.json");

function lerBanco() {
  const dados = fs.readFileSync(caminhoBanco, "utf-8");
  return JSON.parse(dados);
}

function salvarBanco(dados) {
  fs.writeFileSync(caminhoBanco, JSON.stringify(dados, null, 2));
}

function listarDentistas() {
  return lerBanco();
}

function buscarDentista(cpf) {
  const dentistas = lerBanco();
  return dentistas.find(
    (dentista) => dentista.CPF_Dentista === cpf || dentista._id === cpf
  );
}

function criarDentista(novoDentista) {
  const dentistas = lerBanco();

  const cpfExistente = dentistas.find(
    (dentista) => dentista.CPF_Dentista === novoDentista.CPF_Dentista
  );

  const croExistente = dentistas.find(
    (dentista) => dentista.CRO === novoDentista.CRO
  );

  if (cpfExistente || croExistente) {
    return null;
  }

  const dentista = {
    _id: novoDentista.CPF_Dentista,
    CPF_Dentista: novoDentista.CPF_Dentista,
    nome: novoDentista.nome,
    CRO: novoDentista.CRO,
    croUF: novoDentista.croUF,
    especialidade: novoDentista.especialidade
  };

  dentistas.push(dentista);
  salvarBanco(dentistas);

  return dentista;
}

function editarDentista(cpf, dadosAtualizados) {
  const dentistas = lerBanco();

  const indiceDentista = dentistas.findIndex(
    (dentista) => dentista.CPF_Dentista === cpf
  );

  if (indiceDentista === -1) {
    return null;
  }

  dentistas[indiceDentista] = {
    ...dentistas[indiceDentista],
    ...dadosAtualizados
  };

  salvarBanco(dentistas);
  return dentistas[indiceDentista];
}

function deletarDentista(cpf) {
  const dentistas = lerBanco();

  const indiceDentista = dentistas.findIndex(
    (dentista) => dentista.CPF_Dentista === cpf
  );

  if (indiceDentista === -1) {
    return false;
  }

  dentistas.splice(indiceDentista, 1);
  salvarBanco(dentistas);

  return true;
}

module.exports = {
  listarDentistas,
  buscarDentista,
  criarDentista,
  editarDentista,
  deletarDentista
};