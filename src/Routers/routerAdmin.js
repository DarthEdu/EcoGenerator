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
route.get('/administrador/clientes',VerifyToken ,ControladorObtenerClientes)
route.put('/administrador/clientes/:id', VerifyToken,ControladorActualizarClientes)
route.delete('/administrador/clientes/:id',VerifyToken ,ControladorEliminarClientes)
export default route