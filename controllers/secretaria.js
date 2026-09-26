import { getTodasSecretarias, getSecretariaPorId, insereSecretaria, modificaSecretaria, excluirSecretaria, buscarSecretariasPorNome } from "../services/secretaria.js";
import mongoose from "mongoose";

export const getSecretarias = async (req,res) =>{
    try {
        const { nome } = req.query;
        if (nome !== undefined && (typeof nome !== "string" || !nome.trim())) {
            return res.status(422).json({ message: "Informe um nome válido para busca" });
        }
        const secretarias = await getTodasSecretarias(nome);
        res.json(secretarias)     
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getSecretaria = async (req,res) => {
    try {
        const id = req.params.id
        if (mongoose.isObjectIdOrHexString(id)) {
            const secretaria = await getSecretariaPorId(id)
            if (!secretaria) {
                return res.status(404).json({ message: "Secretária não encontrada" });
            }
            res.json(secretaria)
        } else {
            res.status(422).json({message: "Id inválido"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const postSecretaria = async (req,res) => {
    try {
        const body = req.body
        if (typeof body?.nome === "string" && body.nome.trim() && /^\d{11}$/.test(body?.cpf)) {
            const secretaria = await insereSecretaria(body)
            res.status(201).json({message: "Secretária cadastrada!", data: secretaria})
        } else {
            res.status(422).json({message:"Nome e CPF com 11 dígitos são obrigatórios"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const patchSecretaria = async (req, res) => {
    try {
        const id = req.params.id;
        const modificacoes = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(422).json({message: "Id inválido"});
        }
        const secretariaAtualizada = await modificaSecretaria(modificacoes,id);
        if (!secretariaAtualizada) {
            return res.status(404).json({ message: "Secretária não encontrada" });
        }

        return res.status(200).json({
            message: "Secretaria atualizada!",
            data: secretariaAtualizada
        });

    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(422).json({ error: error.message });
        }
        return res.status(500).json({
            error: error.message
        });
    }
};

export const deleteSecretaria = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(422).json({message: "Id inválido" });
        }
        const secretariaRemovida = await excluirSecretaria(id);
        if (!secretariaRemovida) {
            return res.status(404).json({ message: "Secretária não encontrada" });
        }

        return res.status(200).json({
            message: "Secretaria removida!"
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export const getSecretariaPorNome = async (req, res) => {
  try {
    const { nome } = req.query;

    if (typeof nome !== "string" || !nome.trim()) {
      return res.status(422).json({ message: "Informe o nome para busca" });
    }

    const secretarias = await buscarSecretariasPorNome(nome);
    return res.json(secretarias);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
