import Procedimento from "../models/Procedimentos.js";

export async function getAllProcedimentos() {
    const listaProcedimento = await Procedimento.find({});
    return listaProcedimento;
}

export async function getProcedimentoId(id) {
    const procedimento = await Procedimento.findById(id);
    return procedimento;
}

export async function existeProcedimentoId(id){
    const procedimento = await Procedimento.findById(id);
    return Boolean(procedimento);
}

export async function postProcedimento(procedimentoNovo) {
    return Procedimento.create(procedimentoNovo);
}

export async function patchProcedimento(id, novosDados) {
    return Procedimento.findByIdAndUpdate(id, novosDados, {
        new: true,
        runValidators: true
    });
}

export async function deleteProcedimento(id) {
    return Procedimento.findByIdAndDelete(id);
}
