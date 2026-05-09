const fs = require('fs');
const path = require('path');

async function getAllProcedimentos() {
    const filePath = path.join(__dirname, '../database/procedimento.json');
    const content = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(content);
}

async function getProcedimentoId(idProcedimento) {
    const procedimentos = await getAllProcedimentos();
    const idNumber = Number(idProcedimento);
    return procedimentos.find(procedimento => procedimento.idProcedimento === idNumber);
}

async function postProcedimento(procedimentoNovo) {
    const procedimentos = await getAllProcedimentos();
    const idProcedimento = procedimentos.length + 1;
    procedimentoNovo.idProcedimento = idProcedimento;
    procedimentos.push(procedimentoNovo);
    const filePath = path.join(__dirname, '../database/procedimento.json');
    await fs.promises.writeFile(filePath, JSON.stringify(procedimentos, null, 2));
    return procedimentoNovo;
}

module.exports = {
    getAllProcedimentos,
    getProcedimentoId,
    postProcedimento
};
