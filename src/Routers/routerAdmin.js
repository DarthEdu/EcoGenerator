import { ControladorCrearAdmin,
         ControladorLoginAdmin,
         ControladorObtenerClientes,
         ControladorActualizarClientes,
         ControladorEliminarClientes } from "../Controllers/controladorAdmin.js";
import { Router } from "express";
import { VerifyToken } from "../Middleware/auth.js";
const route = Router()

//publicas
route.post('/administrador/registro', ControladorCrearAdmin)
route.post('/administrador/login', ControladorLoginAdmin)

//privadas
route.get('/clientes',VerifyToken ,ControladorObtenerClientes)
route.put('/clientes/actualizar/:id', VerifyToken,ControladorActualizarClientes)
route.delete('/clientes/eliminar/:id',VerifyToken ,ControladorEliminarClientes)
export default route