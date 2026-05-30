import { Router } from "express";
import { getSecretarias, getSecretaria, postSecretaria, patchSecretaria, deleteSecretaria, getSecretariaPorNome } from "../controllers/secretaria.js";

const rotaSecretaria = Router();

rotaSecretaria.get('/buscar', getSecretariaPorNome);

rotaSecretaria.get('/', getSecretarias)

rotaSecretaria.get('/:id', getSecretaria)

rotaSecretaria.post('/', postSecretaria)

rotaSecretaria.patch('/:id', patchSecretaria)

rotaSecretaria.delete('/:id', deleteSecretaria)

export default rotaSecretaria;
