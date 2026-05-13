const {readData, writeData} = require('../filesystem');

const filePath = './database/atendimento.json';

function getAllAtendimentos() {
    return readData(filePath);
}

function getAtendimentoById(id) {
    const atendimentos = readData(filePath);
    console.log(id);
    return atendimentos.find(atendimento => atendimento.idAtendimento === parseInt(id));
}

function createAtendimento(data) {
    const atendimentos = readData(filePath);
    const newAtendimento = [ ...atendimentos, data ];
    writeData(filePath, newAtendimento);
    return newAtendimento;
}

function updateAtendimento(id, data) {
    const atendimentos = readData(filePath);
    const index = atendimentos.findIndex(atendimento => atendimento.idAtendimento === parseInt(id));
    if (index !== -1) {
        atendimentos[index] = { idAtendimento: parseInt(id), ...data };
        writeData(filePath, atendimentos);
        return atendimentos[index];
    }
    return null;
}

function deleteAtendimento(id) {
    let atendimentos = readData(filePath);
    const index = atendimentos.findIndex(atendimento => atendimento.idAtendimento === parseInt(id));
    if (index !== -1) {
        const deletedAtendimento = atendimentos.splice(index, 1)[0];
        writeData(filePath, atendimentos);
        return deletedAtendimento;
    }
    return null;
}

module.exports = {
    getAllAtendimentos,
    getAtendimentoById,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento
};