import Atendimento from '../models/Atendimento.js';
import Secretaria from '../models/Secretaria.js';

async function getAllAtendimentos(observacao) {
    const filtro = {};

    if (observacao) {
        filtro.observacao = { $regex: observacao, $options: 'i' };
    }

    const atendimentos = await Atendimento.find(filtro)
        .sort({ idAtendimento: 1 })
        .lean();
    const cpfsSecretarias = [
        ...new Set(atendimentos.map((atendimento) => atendimento.fk_CPF_Secretaria)),
    ];
    const secretarias = await Secretaria.find({
        cpf: { $in: cpfsSecretarias },
    })
        .select('nome cpf')
        .lean();
    const nomesPorCpf = new Map(
        secretarias.map((secretaria) => [secretaria.cpf, secretaria.nome]),
    );

    return atendimentos.map((atendimento) => ({
        ...atendimento,
        secretaria: {
            nome: nomesPorCpf.get(atendimento.fk_CPF_Secretaria) || null,
            cpf: atendimento.fk_CPF_Secretaria,
        },
    }));
}

async function getAtendimentoById(id) {
    return Atendimento.findById(id);
}

async function getAtendimentosPorNomeSecretaria(nome) {
    const secretarias = await Secretaria.find({
        nome: { $regex: nome, $options: 'i' },
    }).select('nome cpf').lean();

    const cpfs = secretarias
        .map((secretaria) => secretaria.cpf)
        .filter(Boolean);

    if (cpfs.length === 0) {
        return { secretarias, atendimentos: [] };
    }

    const nomesPorCpf = new Map(
        secretarias.map((secretaria) => [secretaria.cpf, secretaria.nome]),
    );
    const atendimentos = await Atendimento.find({
        fk_CPF_Secretaria: { $in: cpfs },
    })
        .sort({ data: 1, horario_inicio: 1 })
        .lean();

    return {
        secretarias,
        atendimentos: atendimentos.map((atendimento) => ({
            ...atendimento,
            secretaria: {
                nome: nomesPorCpf.get(atendimento.fk_CPF_Secretaria),
                cpf: atendimento.fk_CPF_Secretaria,
            },
        })),
    };
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
    getAtendimentosPorNomeSecretaria,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento
};
