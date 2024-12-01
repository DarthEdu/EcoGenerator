import { controladorRegisClientes,controladorLoginClientes,controladorVerGeneradores } from "../Controllers/controladorCliente.js";
import { Router } from "express";
const routerCliente = Router()
//Enpoints de Registro y Login
routerCliente.post('/cliente/registro',controladorRegisClientes)
routerCliente.post('/cliente/login',controladorLoginClientes)

//Enpoints para ver generadores
routerCliente.get('/cliente/generadores',controladorVerGeneradores)

export default routerCliente