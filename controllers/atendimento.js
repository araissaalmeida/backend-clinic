import {
    createAtendimento,
    deleteAtendimento,
    getAllAtendimentos,
    getAtendimentoById,
    updateAtendimento
} from '../services/atendimento.js';

function isValidId(id) {
    return /^[a-zA-Z0-9]+$/.test(String(id));
}

function validateBody(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return { valid: false, message: 'Body deve ser um objeto JSON válido' };
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
        return { valid: false, message: 'Body não pode ser vazio' };
    }

    return { valid: true };
}

async function getAll(req, res) {
    try {
        const { observacao } = req.query;
        const atendimentos = await getAllAtendimentos(observacao);
        res.status(200).json({ message: 'Lista de atendimentos', data: atendimentos });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter atendimentos' });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(422).json({ error: 'Id inválido. Informe apenas letras e números.' });
        }
        const atendimento = await getAtendimentoById(id);
        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.status(200).json({ message: `Detalhes do atendimento ${id}`, data: atendimento });
    } catch (error) {
        if (error?.name === 'CastError') {
            return res.status(422).json({ error: 'Id inválido.' });
        }

        res.status(500).json({ error: 'Erro ao obter atendimento' });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const validation = validateBody(data);
        if (!validation.valid) {
            return res.status(422).json({ error: validation.message });
        }
        const newAtendimento = await createAtendimento(data);
        res.status(201).json({ message: 'Atendimento criado', data: newAtendimento });
    } catch (error) {
        if (error?.name === 'ValidationError') {
            return res.status(422).json({ error: error.message });
        }

        if (error?.code === 11000) {
            return res.status(409).json({ error: 'idAtendimento já existe' });
        }

        res.status(500).json({ error: 'Erro ao criar atendimento' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(422).json({ error: 'Id inválido. Informe apenas letras e números.' });
        }
        const data = req.body;
        const validation = validateBody(data);
        if (!validation.valid) {
            return res.status(422).json({ error: validation.message });
        }
        const updatedAtendimento = await updateAtendimento(id, data);
        if (!updatedAtendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.status(200).json({ message: `Atendimento ${id} atualizado`, data: updatedAtendimento });
    } catch (error) {
        if (error?.name === 'ValidationError' || error?.name === 'CastError') {
            return res.status(422).json({ error: error.message });
        }

        if (error?.code === 11000) {
            return res.status(409).json({ error: 'idAtendimento já existe' });
        }

        res.status(500).json({ error: 'Erro ao atualizar atendimento' });
    }
}

async function deleteById(req, res) {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(422).json({ error: 'Id inválido. Informe apenas letras e números.' });
        }
        const deletedAtendimento = await deleteAtendimento(id);
        if (!deletedAtendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.status(200).json({ message: `Atendimento ${id} deletado`, data: deletedAtendimento });
    } catch (error) {
        if (error?.name === 'CastError') {
            return res.status(422).json({ error: 'Id inválido.' });
        }

        res.status(500).json({ error: 'Erro ao deletar atendimento' });
    }
}

export {
    getAll,
    getById,
    create,
    update,
    deleteById
};