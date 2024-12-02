import { controladorRegisClientes,controladorLoginClientes,controladorVerGeneradores, controladorVerGeneradorId } from "../Controllers/controladorCliente.js";
import { Router } from "express";
const routerCliente = Router()

//publicas
//Enpoints de Registro y Login
routerCliente.post('/cliente/registro',controladorRegisClientes)
routerCliente.post('/cliente/login',controladorLoginClientes)
//Enpoints para ver generadores
routerCliente.get('/cliente/generadores',controladorVerGeneradores)
routerCliente.get('/cliente/:id',controladorVerGeneradorId)

export default routerCliente