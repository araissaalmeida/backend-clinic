import Atendimento from '../models/Atendimento.js';

async function getAllAtendimentos(tipoAtendimento) {
    const filtro = {};

    if (tipoAtendimento) {
        filtro.tipoAtendimento = String(tipoAtendimento).trim().toUpperCase();
    }

    return Atendimento.find(filtro).sort({ idAtendimento: 1 });
}

async function getAtendimentoById(id) {
    return Atendimento.findOne({ idAtendimento: parseInt(id, 10) });
}

async function createAtendimento(data) {
    return Atendimento.create(data);
}

async function updateAtendimento(id, data) {
    return Atendimento.findOneAndUpdate(
        { idAtendimento: parseInt(id, 10) },
        { ...data, idAtendimento: parseInt(id, 10) },
        { new: true, runValidators: true }
    );
}

async function deleteAtendimento(id) {
    return Atendimento.findOneAndDelete({ idAtendimento: parseInt(id, 10) });
}

export {
    getAllAtendimentos,
    getAtendimentoById,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento
};