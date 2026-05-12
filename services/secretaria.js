const fs = require("fs");

const caminhoArquivo = "./database/secretaria.json";


const lerArquivo = () => {
    return JSON.parse(fs.readFileSync(caminhoArquivo, "utf-8"));
};

const escreverArquivo = (dados) => {
    fs.writeFileSync(caminhoArquivo,JSON.stringify(dados, null, 2));
};

const getTodasSecretarias = () => {
    return lerArquivo();
};

function getSecretariaPorId(id){
    const secretarias = lerArquivo()
    return secretarias.find(secretaria => secretaria.id === id )
};

const insereSecretaria = (secretariaNova) => {
    const secretarias = lerArquivo();
    secretarias.push(secretariaNova);
    escreverArquivo(secretarias);
};

const modificaSecretaria = (modificacoes, id) => {
    const secretarias = lerArquivo();
    const indiceSecretaria = secretarias.findIndex(secretaria => secretaria.id === id);

    if (indiceSecretaria === -1) {
        throw new Error("Secretaria não encontrada");
    }
    secretarias[indiceSecretaria] = {...secretarias[indiceSecretaria],...modificacoes};

    escreverArquivo(secretarias);
    return secretarias[indiceSecretaria];
};

const excluirSecretaria = (id) => {
    const secretarias = lerArquivo();
    const secretariaExiste = secretarias.some(secretaria => secretaria.id === id);

    if (!secretariaExiste) {
        throw new Error("Secretaria não encontrada");
    }
    const novaListaSecretarias = secretarias.filter(secretaria => secretaria.id !== id);
    escreverArquivo(novaListaSecretarias);
};

module.exports = {getTodasSecretarias, getSecretariaPorId, insereSecretaria,modificaSecretaria,excluirSecretaria}