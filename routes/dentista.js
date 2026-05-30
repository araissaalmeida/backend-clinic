import express from 'express';

import {
	listarDentistas,
	buscarDentista,
	criarDentista,
	editarDentista,
	deletarDentista
} from '../controllers/dentista.js';

const router = express.Router();

router.get('/', listarDentistas);
router.get('/:cpf', buscarDentista);
router.post('/', criarDentista);
router.put('/:cpf', editarDentista);
router.delete('/:cpf', deletarDentista);

export default router;