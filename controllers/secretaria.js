import { getTodasSecretarias, getSecretariaPorId, insereSecretaria, modificaSecretaria, excluirSecretaria } from "../services/secretaria.js";


export const getSecretarias = async (req,res) =>{
    try {
        const secretarias = await getTodasSecretarias();
        res.json(secretarias)     
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getSecretaria = async (req,res) => {
    try {
        const id = req.params.id
        if (id && String(id)) {
            const secretaria = await getSecretariaPorId(id)
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
        if (req.body.nome) {
            insereSecretaria(body)
            res.status(201).json({message: "Secretária cadastrada!"})
        } else {
            res.status(422).json({message:"O nome é obrigatório"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const patchSecretaria = async (req, res) => {
    try {
        const id = req.params.id;
        const modificacoes = req.body;

        if (!id || isNaN(String(id))) {
            return res.status(422).json({message: "Id inválido"});
        }
        const secretariaAtualizada = await modificaSecretaria(modificacoes,id);

        return res.status(200).json({
            message: "Secretaria atualizada!",
            data: secretariaAtualizada
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const deleteSecretaria = (req, res) => {
    try {
        const id = req.params.id;

        if (!id || isNaN(String(id))) {
            return res.status(422).json({message: "Id inválido" });
        }
        excluirSecretaria(id);

        return res.status(200).json({
            message: "Secretaria removida!"
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};