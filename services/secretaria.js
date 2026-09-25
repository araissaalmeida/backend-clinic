import secretarias from "../models/Secretaria.js";

export async function getTodasSecretarias(nome) {
    const filtro = {};
    if (nome) {
        filtro.nome = { $regex: nome, $options: "i" };
    }
    return secretarias.find(filtro).exec();
}

export async function getSecretariaPorId(id) {
    return secretarias.findById(id).exec();
}

export async function insereSecretaria(secretariaNova) {
    return secretarias.create(secretariaNova);
}

export async function modificaSecretaria(modificacoes, id) {
    return secretarias.findByIdAndUpdate(id, modificacoes, {
        new: true,
        runValidators: true
    }).exec();
}

export async function excluirSecretaria(id) {
    return secretarias.findByIdAndDelete(id).exec();
}

export async function buscarSecretariasPorNome(nome) {
    return getTodasSecretarias(nome);
}
