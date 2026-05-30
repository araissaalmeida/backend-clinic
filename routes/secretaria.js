import { Router } from "express";
import { getSecretarias, getSecretaria, postSecretaria, patchSecretaria, deleteSecretaria } from "../controllers/secretaria.js";

const rotaSecretaria = Router();

rotaSecretaria.get('/', getSecretarias)

rotaSecretaria.get('/:id', getSecretaria)

rotaSecretaria.post('/', postSecretaria)

rotaSecretaria.patch('/:id', patchSecretaria)

rotaSecretaria.delete('/:id', deleteSecretaria)

export default rotaSecretaria;
