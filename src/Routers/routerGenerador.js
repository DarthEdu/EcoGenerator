
import {Router} from 'express'
import { VerifyToken } from '../Middleware/auth.js'
import { createGeneradorController, deleteGeneradorController, getAllGeneradorControllerByID, getAllGeneradoresController, updateGeneradorController } from '../Controllers/controladorGenerador.js'

const router=Router()

// rutas publicas
router.get('/generador', getAllGeneradoresController)
router.get('/generador/q=:id', getAllGeneradorControllerByID)

// rutas privadas
router.delete('/generador/q=:id',VerifyToken,deleteGeneradorController)
router.put('/generador/q=:id',VerifyToken,updateGeneradorController)
router.post('/generador',VerifyToken,createGeneradorController)

export default router



