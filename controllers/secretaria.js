const { getTodasSecretarias, getSecretariaPorId, insereSecretaria, modificaSecretaria, excluirSecretaria } = require("../services/secretaria");


const getSecretarias = (req,res) =>{
    try {
        const secretarias = getTodasSecretarias();
        res.json(secretarias)     
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getSecretaria = (req,res) => {
    try {
        const id = req.params.id
        if (id && Number(id)) {
            const secretaria = getSecretariaPorId(id)
            res.json(secretaria)
        } else {
            res.status(422).json({message: "Id inválido"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const postSecretaria = (req,res) => {
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

const patchSecretaria = (req, res) => {
    try {
        const id = req.params.id;
        const modificacoes = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(422).json({message: "Id inválido"});
        }
        const secretariaAtualizada = modificaSecretaria(modificacoes,id);

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

const deleteSecretaria = (req, res) => {
    try {
        const id = req.params.id;

        if (!id || isNaN(Number(id))) {
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

module.exports = {getSecretarias, getSecretaria, postSecretaria, patchSecretaria,deleteSecretaria}