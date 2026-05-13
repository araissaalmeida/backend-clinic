const { Router } = require('express');
const { getProcedimentos,
    getProcedimento,
    criarProcedimento,
    editarProcedimento,
    deletarProcedimento
 } = require('../controllers/procedimento');

const router = Router();

router.get('/', getProcedimentos);
router.get('/:id', getProcedimento);
router.post('/', criarProcedimento);
router.patch('/:id', editarProcedimento);
router.delete('/:id', deletarProcedimento);

module.exports = router;
