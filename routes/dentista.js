const express = require("express");
const router = express.Router();

const dentistaController = require("../controllers/dentista");

router.get("/", dentistaController.listarDentistas);
router.get("/:cpf", dentistaController.buscarDentista);
router.post("/", dentistaController.criarDentista);
router.put("/:cpf", dentistaController.editarDentista);
router.delete("/:cpf", dentistaController.deletarDentista);

module.exports = router;