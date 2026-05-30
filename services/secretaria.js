import fs from "fs";
import secretarias from "../models/Secretaria.js";


export async function getTodasSecretarias() {
    const listaSecretaria = await secretarias.find({});
    return listaSecretaria;
};

export async function getSecretariaPorId(id){
    const listaSecretaria = await secretarias.findById(id);
    return listaSecretaria;
};

export async function insereSecretaria (secretariaNova){
    await secretarias.create(secretariaNova);
};

export async function modificaSecretaria(modificacoes, id) {
    await secretarias.findByIdAndUpdate(id,modificacoes);
};

export async function excluirSecretaria(id) {
    await secretarias.findByIdAndDelete(id);
};

export async function buscarSecretariasPorNome(nome) {
  return await secretarias.find({
    nome: { $regex: nome, $options: "i" }
  });
}