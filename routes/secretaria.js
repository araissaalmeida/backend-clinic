const {Router} = require("express");
const { getSecretarias, getSecretaria, postSecretaria, patchSecretaria, deleteSecretaria } = require("../controllers/secretaria");

const router = Router();

router.get('/', getSecretarias)

router.get('/:id', getSecretaria)

router.post('/', postSecretaria)

router.patch('/:id', patchSecretaria)

router.delete('/:id', deleteSecretaria)


module.exports = router;