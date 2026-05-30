import express from 'express';
import atendimentoController from '../controllers/atendimento.js';

const router = express.Router();

router.get('/', atendimentoController.getAll);
router.get('/:id', atendimentoController.getById);
router.post('/', atendimentoController.create);
router.patch('/:id', atendimentoController.update);
router.delete('/:id', atendimentoController.deleteById);
export default router; 
