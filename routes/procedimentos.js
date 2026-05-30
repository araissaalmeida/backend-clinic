import { Router } from 'express';
import {
    buscarProcedimentosPorNome,
    getProcedimentos,
    getProcedimento,
    criarProcedimento,
    editarProcedimento,
    deletarProcedimento
} from '../controllers/procedimento.js';

const router = Router();

router.get('/', getProcedimentos);
router.get('/busca', buscarProcedimentosPorNome);
router.get('/:id', getProcedimento);
router.post('/', criarProcedimento);
router.patch('/:id', editarProcedimento);
router.delete('/:id', deletarProcedimento);

export default router;
