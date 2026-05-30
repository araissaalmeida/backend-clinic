import Dentista from "../models/Dentista.js";

async function listarDentistas(nomeBusca) {
  try {
    if (nomeBusca) {
      // Busca por qualquer parte do nome, ignorando letras maiúsculas/minúsculas
      return await Dentista.find({ nome: { $regex: nomeBusca, $options: 'i' } });
    }
    // Se não passar nome, retorna todos
    return await Dentista.find();
  } catch (error) {
    throw new Error("Erro ao listar dentistas: " + error.message);
  }
}

async function buscarDentista(cpf) {
  try {
    return await Dentista.findById(cpf);
  } catch (error) {
    throw new Error("Erro ao buscar dentista: " + error.message);
  }
}

async function criarDentista(novoDentista) {
  try {
    const dentistaExistente = await Dentista.findById(novoDentista._id);
    const croExistente = await Dentista.findOne({ CRO: novoDentista.CRO });

    if (dentistaExistente || croExistente) {
      return null;
    }

    const dentista = new Dentista(novoDentista);
    await dentista.save();
    return dentista;
  } catch (error) {
    throw new Error("Erro ao criar dentista: " + error.message);
  }
}

async function editarDentista(cpf, dadosAtualizados) {
  try {
    const dentistaAtualizado = await Dentista.findByIdAndUpdate(
      cpf,
      dadosAtualizados,
      { new: true }
    );
    return dentistaAtualizado;
  } catch (error) {
    throw new Error("Erro ao editar dentista: " + error.message);
  }
}

async function deletarDentista(cpf) {
  try {
    const resultado = await Dentista.findByIdAndDelete(cpf);
    return resultado !== null;
  } catch (error) {
    throw new Error("Erro ao deletar dentista: " + error.message);
  }
}

export default {
  listarDentistas,
  buscarDentista,
  criarDentista,
  editarDentista,
  deletarDentista
};