const express = require('express');
const router = express.Router();
const {create, deleteById, getAll, getById, update} = require('../controllers/atendimento');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteById);

module.exports = router;