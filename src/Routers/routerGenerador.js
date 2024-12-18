
import {Router} from 'express'
import { VerifyToken } from '../Middleware/auth.js'
import { createGeneradorController, deleteGeneradorController, getAllGeneradorControllerByID, getAllGeneradoresController, updateGeneradorController } from '../Controllers/controladorGenerador.js'

const router=Router()


// Rutas publicas
router.get('/generador', getAllGeneradoresController)
router.get('/generador/:id', getAllGeneradorControllerByID)

// Rutas privadas
router.delete('/generador/:id',VerifyToken,deleteGeneradorController)
router.put('/generador/:id',VerifyToken,updateGeneradorController)
router.post('/generador',VerifyToken,createGeneradorController)

export default router



