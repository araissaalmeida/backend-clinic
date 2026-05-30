import {
    createAtendimento,
    deleteAtendimento,
    getAllAtendimentos,
    getAtendimentoById,
    updateAtendimento
} from '../services/atendimento.js';
import mongoose from 'mongoose';

const allowedBodyFields = [
    'idAtendimento',
    'observacao',
    'data',
    'valorTotal',
    'tipoAtendimento',
    'parcelas',
    'fk_CPF_Paciente',
    'fk_CPF_Secretaria',
    'status',
    'horario_inicio',
    'horario_fim'
];

const requiredBodyFields = [
    'idAtendimento',
    'fk_CPF_Paciente',
];

function isValidId(id) {
    return mongoose.isValidObjectId(id);
}

function isValidBodyId(id) {
    return Number.isInteger(id) && id > 0;
}

function validateBody(data, { isUpdate = false } = {}) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return { valid: false, message: 'Body deve ser um objeto JSON válido' };
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
        return { valid: false, message: 'Body não pode ser vazio' };
    }

    const invalidKeys = keys.filter((key) => !allowedBodyFields.includes(key));
    if (invalidKeys.length > 0) {
        return { valid: false, message: `Campos inválidos no body: ${invalidKeys.join(', ')}` };
    }

    if (!isUpdate) {
        const missingFields = requiredBodyFields.filter((field) => data[field] === undefined);
        if (missingFields.length > 0) {
            return { valid: false, message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` };
        }
    }

    if (data.idAtendimento !== undefined && !isValidBodyId(data.idAtendimento)) {
        return { valid: false, message: 'idAtendimento deve ser um número inteiro positivo' };
    }

    if (data.fk_CPF_Paciente !== undefined && !/^\d{11}$/.test(String(data.fk_CPF_Paciente))) {
        return { valid: false, message: 'fk_CPF_Paciente deve conter 11 dígitos numéricos' };
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
            return res.status(422).json({ error: 'Id inválido. Informe um ObjectId válido do MongoDB.' });
        }
        const atendimento = await getAtendimentoById(id);
        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.status(200).json({ message: `Detalhes do atendimento ${id}`, data: atendimento });
    } catch (error) {
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
        res.status(500).json({ error: 'Erro ao criar atendimento' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(422).json({ error: 'Id inválido. Informe um ObjectId válido do MongoDB.' });
        }
        const data = req.body;
        const validation = validateBody(data, { isUpdate: true });
        if (!validation.valid) {
            return res.status(422).json({ error: validation.message });
        }
        const updatedAtendimento = await updateAtendimento(id, data);
        if (!updatedAtendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.status(200).json({ message: `Atendimento ${id} atualizado`, data: updatedAtendimento });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar atendimento' });
    }
}

async function deleteById(req, res) {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(422).json({ error: 'Id inválido. Informe um ObjectId válido do MongoDB.' });
        }
        const deletedAtendimento = await deleteAtendimento(id);
        if (!deletedAtendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado' });
        }
        res.status(200).json({ message: `Atendimento ${id} deletado`, data: deletedAtendimento });
    } catch (error) {
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