import express from 'express';
import {getAll, getById, getPorSecretaria, create, update, deleteById} from '../controllers/atendimento.js';

const router = express.Router();

router.get('/', getAll);
router.get('/por-secretaria', getPorSecretaria);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteById);
export default router; 
