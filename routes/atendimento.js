import express from 'express';

import { create, deleteById, getAll, getById, update } from '../controllers/atendimento.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteById);

export default router;