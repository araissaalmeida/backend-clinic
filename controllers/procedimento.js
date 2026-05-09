const { getAllProcedimentos, getProcedimentoId, postProcedimento: criarProcedimento } = require('../services/procedimento');

function idValido(id) {
    return !isNaN(id);
}

async function getProcedimentos(req, res) {
    try {
        const procedimentos = await getAllProcedimentos();
        res.send(procedimentos);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getProcedimento(req, res) {
    try {
        const id = req.params.id;

        if (!idValido(id)) {
            res.status(422);
            return res.send('O id deve ser um número');
        }

        const procedimento = await getProcedimentoId(id);

        if (!procedimento) {
            res.status(404);
            return res.send('Procedimento não encontrado');
        }
        res.send(procedimento);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

async function postProcedimento(req, res) {
    try {
        const procedimentoNovo = await criarProcedimento(req.body);
        res.status(201).send(procedimentoNovo);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

module.exports = {
    getProcedimentos,
    getProcedimento,
    postProcedimento
};