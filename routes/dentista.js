import express from "express";
import dentistaController from "../controllers/dentista.js";

const router = express.Router();

router.get("/", dentistaController.listarDentistas);
router.get("/:cpf", dentistaController.buscarDentista);
router.post("/", dentistaController.criarDentista);
router.put("/:cpf", dentistaController.editarDentista);
router.delete("/:cpf", dentistaController.deletarDentista);

export default router;