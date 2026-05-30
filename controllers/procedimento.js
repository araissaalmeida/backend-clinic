import mongoose from "mongoose";
import {
    deleteProcedimento,
    getAllProcedimentos,
    getProcedimentoId,
    patchProcedimento,
    postProcedimento
} from "../services/procedimento.js";

function idValido(id) {
    return typeof id === "string"
        && /^[0-9a-fA-F]{24}$/.test(id)
        && mongoose.Types.ObjectId.isValid(id);
}

function textoObrigatorio(valor) {
    return typeof valor === "string" && valor.trim() !== "";
}

function numeroNaoNegativo(valor) {
    return typeof valor === "number" && Number.isFinite(valor) && valor >= 0;
}

function corpoVazio(body) {
    return !body || Object.keys(body).length === 0;
}

function validarProcedimento(procedimento, { parcial = false } = {}) {
    if (corpoVazio(procedimento)) {
        return parcial
            ? "Informe ao menos um campo para atualizar."
            : "Informe os campos obrigatorios: nome, descricao, tipoProcedimento e valor.";
    }

    const camposNaoPermitidos = camposInvalidos(procedimento);
    if (camposNaoPermitidos.length > 0) {
        return `Campos nao permitidos: ${camposNaoPermitidos.join(", ")}.`;
    }

    if (!parcial || procedimento.nome !== undefined) {
        if (!textoObrigatorio(procedimento.nome)) return "O campo nome e obrigatorio.";
    }

    if (!parcial || procedimento.descricao !== undefined) {
        if (!textoObrigatorio(procedimento.descricao)) return "O campo descricao e obrigatorio.";
    }

    if (!parcial || procedimento.tipoProcedimento !== undefined) {
        if (!textoObrigatorio(procedimento.tipoProcedimento)) return "O campo tipoProcedimento e obrigatorio.";
    }

    if (!parcial || procedimento.valor !== undefined) {
        if (!numeroNaoNegativo(procedimento.valor)) return "O campo valor deve ser um numero maior ou igual a zero.";
    }

    return null;
}

function erroInterno(res, error) {
    console.error(error);

    if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({ mensagem: "Dados invalidos." });
    }

    return res.status(500).json({ mensagem: "Erro interno do servidor." });
}

export async function getProcedimentos(req, res) {
    try {
        const procedimentos = await getAllProcedimentos();
        return res.status(200).json(procedimentos);
    } catch (error) {
        return erroInterno(res, error);
    }
}

export async function getProcedimento(req, res) {
    try {
        const { id } = req.params;

        if (!idValido(id)) {
            return res.status(400).json({ mensagem: "ID invalido." });
        }

        const procedimento = await getProcedimentoId(id);

        if (!procedimento) {
            return res.status(404).json({ mensagem: "Procedimento nao encontrado." });
        }

        return res.status(200).json(procedimento);
    } catch (error) {
        return erroInterno(res, error);
    }
}

export async function criarProcedimento(req, res) {
    try {
        const procedimentoNovo = req.body || {};
        const erroValidacao = validarProcedimento(procedimentoNovo);

        if (erroValidacao) {
            return res.status(400).json({ mensagem: erroValidacao });
        }

        const procedimentoCriado = await postProcedimento(procedimentoNovo);

        return res.status(201).json({
            mensagem: "Procedimento criado com sucesso.",
            procedimento: procedimentoCriado
        });
    } catch (error) {
        return erroInterno(res, error);
    }
}

export async function editarProcedimento(req, res) {
    try {
        const { id } = req.params;
        const modificacoes = req.body || {};

        if (!idValido(id)) {
            return res.status(400).json({ mensagem: "ID invalido." });
        }

        const erroValidacao = validarProcedimento(modificacoes, { parcial: true });

        if (erroValidacao) {
            return res.status(400).json({ mensagem: erroValidacao });
        }

        const procedimentoEditado = await patchProcedimento(id, modificacoes);

        if (!procedimentoEditado) {
            return res.status(404).json({ mensagem: "Procedimento nao encontrado." });
        }

        return res.status(200).json({
            mensagem: "Procedimento atualizado com sucesso.",
            procedimento: procedimentoEditado
        });
    } catch (error) {
        return erroInterno(res, error);
    }
}

export async function deletarProcedimento(req, res) {
    try {
        const { id } = req.params;

        if (!idValido(id)) {
            return res.status(400).json({ mensagem: "ID invalido." });
        }

        const procedimentoRemovido = await deleteProcedimento(id);

        if (!procedimentoRemovido) {
            return res.status(404).json({ mensagem: "Procedimento nao encontrado." });
        }

        return res.status(200).json({ mensagem: "Procedimento deletado com sucesso." });
    } catch (error) {
        return erroInterno(res, error);
    }
}
