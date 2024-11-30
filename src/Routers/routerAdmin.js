import { ControladorCrearAdmin,
         ControladorLoginAdmin,
         ControladorObtenerClientes,
         ControladorActualizarClientes,
         ControladorEliminarClientes } from "../Controllers/controladorAdmin.js";
import { Router } from "express";

const route = Router()

route.post('/administrador/registro', ControladorCrearAdmin)
route.post('/administrador/login', ControladorLoginAdmin)
route.get('/administrador/clientes', ControladorObtenerClientes)
route.put('/administrador/clientes/:id', ControladorActualizarClientes)
route.delete('/administrador/clientes/:id', ControladorEliminarClientes)

export default route