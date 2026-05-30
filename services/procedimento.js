import Procedimento from "../models/Procedimento.js";

export async function getAllProcedimentos() {
    return Procedimento.find({});
}

export async function getProcedimentoId(id) {
    return Procedimento.findById(id);
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
