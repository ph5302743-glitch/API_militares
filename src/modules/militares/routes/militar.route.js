import express from 'express'
import militarController from '../controllers/militar.controller'

const router = express.Router();

router.post("/militares/cadastrar", militarController.cadastrar)
router.get("/militares/listar", militarController.listarTodos)
router.get("/militares/listar/:id", militarController.listarPorId)
router.put("/militares/editar/total/:id", militarController.editarTotal)
router.patch("/militares/editar/parcial/:id", militarController.editarParcial )
router.delete("/militares/excluir/:id", militarController.excluirPorId)
router.delete("/militares/excluir/todos", militarController.excluirTodos)

export default router 