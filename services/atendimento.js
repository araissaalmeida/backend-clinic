import Atendimento from '../models/Atendimento.js';

async function getAllAtendimentos(observacao) {
    const filtro = {};

    if (observacao) {
        filtro.observacao = { $regex: observacao, $options: 'i' };
    }

    return Atendimento.find(filtro).sort({ idAtendimento: 1 });
}

async function getAtendimentoById(id) {
    return Atendimento.findById(id);
}

async function createAtendimento(data) {
    return Atendimento.create(data);
}

async function updateAtendimento(id, data) {
    return Atendimento.findByIdAndUpdate(id, { ...data }, { new: true, runValidators: true });
}

async function deleteAtendimento(id) {
    return Atendimento.findByIdAndDelete(id);
}

export {
    getAllAtendimentos,
    getAtendimentoById,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento
};