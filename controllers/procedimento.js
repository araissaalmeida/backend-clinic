const { getAllProcedimentos,
    getProcedimentoId,
    postProcedimento,
    patchProcedimento,
    deleteProcedimento
 } = require('../services/procedimento');

function idValido(id) {
    const idNumber = Number(id);
    if (idNumber <= 0) {
        return false;
    }
    if (!Number.isInteger(idNumber)) {
        return false;
    }
    return true;
}

function procedimentoValido(procedimento){
    if (!procedimento.nome) {
        return false;
    }
    if (!procedimento.descricao) {
        return false;
    }
    if (!procedimento.tipoProcedimento) {
        return false;
    }
    if (procedimento.valor === undefined) {
        return false;
    }
    return true;
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
            res.status(422).send('O id deve ser um número');
        }
        const procedimento = await getProcedimentoId(id);
        if (!procedimento) {
            return res.status(404).send('Procedimento não encontrado');
        }
        res.send(procedimento);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function criarProcedimento(req, res) {
    try {
        const body = req.body;
        if (!procedimentoValido(body)) {
            return res.status(422).send('Todos os campos são obrigatórios: nome, descrição, tipo do procedimento e valor');
        }
        const novoProcedimento = await postProcedimento(body);
        res.status(201).send(novoProcedimento);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function editarProcedimento(req, res) {
    try {
        const id = req.params.id;
        if (!idValido(id)) {
            return res.status(422).send('O id deve ser um número');
        }
        const body = req.body;
        const procedimentoEditado = await patchProcedimento(id, body);

        if (!procedimentoEditado) {
            return res.status(404).send('Procedimento não encontrado');
        }
        res.send(procedimentoEditado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deletarProcedimento(req, res) {
    try {
        const id = req.params.id;
        if (!idValido(id)) {
            return res.status(422).send('O id deve ser um número');
        }
        const procedimentoRemovido = await deleteProcedimento(id);
        if (!procedimentoRemovido) {
            return res.status(404).send('Procedimento não encontrado');
        }
        res.send('Procedimento deletado com sucesso');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getProcedimentos,
    getProcedimento,
    criarProcedimento,
    editarProcedimento,
    deletarProcedimento

};