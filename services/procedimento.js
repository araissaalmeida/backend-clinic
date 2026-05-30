import procedimento from '.../models/procedimento.js';

export async function getAllProcedimentos() {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(content);
}

export async function salvarProcedimentos(procedimentos) {
    await fs.promises.writeFile(filePath, JSON.stringify(procedimentos, null, 2));
}

export async function getProcedimentoId(idProcedimento) {
    const procedimentos = await getAllProcedimentos();
    const idNumber = Number(idProcedimento);
    return procedimentos.find(procedimento => procedimento.idProcedimento === idNumber);
}

export async function postProcedimento(procedimentoNovo) {
    const procedimentos = await getAllProcedimentos();
    const ultimoId = procedimentos.length > 0 ? procedimentos[procedimentos.length - 1].idProcedimento : 0;
    procedimentoNovo.idProcedimento = ultimoId + 1;
    procedimentos.push(procedimentoNovo);
    await salvarProcedimentos(procedimentos);

    return procedimentoNovo;
}

export async function patchProcedimento(idProcedimento, novosDados) {
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

export async function deleteProcedimento(idProcedimento) {
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