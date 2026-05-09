const { Router } = require('express');
const { getProcedimentos, getProcedimento, postProcedimento } = require('../controllers/procedimento');

const router = Router();

router.get('/', getProcedimentos);
router.get('/:id', getProcedimento);
router.post('/', postProcedimento);

module.exports = router;
