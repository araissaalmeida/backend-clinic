import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../database/procedimento.json');

async function getAllProcedimentos() {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(content);
}

async function salvarProcedimentos(procedimentos) {
    await fs.promises.writeFile(filePath, JSON.stringify(procedimentos, null, 2));
}

async function getProcedimentoId(idProcedimento) {
    const procedimentos = await getAllProcedimentos();
    const idNumber = Number(idProcedimento);
    return procedimentos.find(procedimento => procedimento.idProcedimento === idNumber);
}

async function postProcedimento(procedimentoNovo) {
    const procedimentos = await getAllProcedimentos();
    const ultimoId = procedimentos.length > 0 ? procedimentos[procedimentos.length - 1].idProcedimento : 0;
    procedimentoNovo.idProcedimento = ultimoId + 1;
    procedimentos.push(procedimentoNovo);
    await salvarProcedimentos(procedimentos);

    return procedimentoNovo;
}

async function patchProcedimento(idProcedimento, novosDados) {
    const procedimentos = await getAllProcedimentos();
    const idNumber = Number(idProcedimento);
    const index = procedimentos.findIndex(procedimento => procedimento.idProcedimento === idNumber);
    if (index === -1) {
        return null;
    }
    procedimentos[index] = {
        ...procedimentos[index],
        ...novosDados,
        idProcedimento: idNumber
    };
    await salvarProcedimentos(procedimentos);
    return procedimentos[index];
}

async function deleteProcedimento(idProcedimento) {
    const procedimentos = await getAllProcedimentos();
    const idNumber = Number(idProcedimento);
    const index = procedimentos.findIndex(procedimento => procedimento.idProcedimento === idNumber);
    if (index === -1) {
        return null;
    }
    const procedimentoRemovido = procedimentos.splice(index, 1);
    await salvarProcedimentos(procedimentos);
    return procedimentoRemovido[0];
}

export {
    getAllProcedimentos,
    getProcedimentoId,
    postProcedimento,
    patchProcedimento,
    deleteProcedimento
};
