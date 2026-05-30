import { Router } from 'express';
import {
    getProcedimentos,
    getProcedimento,
    criarProcedimento,
    editarProcedimento,
    deletarProcedimento
} from '../controllers/procedimento.js';

const router = Router();

router.get('/', getProcedimentos);
router.get('/:id', getProcedimento);
router.post('/', criarProcedimento);
router.patch('/:id', editarProcedimento);
router.delete('/:id', deletarProcedimento);

export default router;
