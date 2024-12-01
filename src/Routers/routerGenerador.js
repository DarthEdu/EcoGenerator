
import {Router} from 'express'
import { createGeneradorController, deleteGeneradorController, getAllGeneradorControllerByID, getAllGeneradoresController, updateGeneradorController } from '../Controllers/controladorGenerador.js'


const router=Router()

// ver generadores
router.get('/generador', getAllGeneradoresController)
router.get('/generador/:id', getAllGeneradorControllerByID)

//eliminar generador
router.delete('/generador/:id', deleteGeneradorController)

// actualizar generador
router.put('/generador/:id', updateGeneradorController)

//crear generador
router.post('/generador', createGeneradorController)

export default router
