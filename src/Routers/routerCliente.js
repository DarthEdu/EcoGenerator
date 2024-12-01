import { controladorRegisClientes,controladorLoginClientes,controladorVerGeneradores } from "../Controllers/controladorCliente.js";
import { Router } from "express";
const routerCliente = Router()

routerCliente.post('/cliente/registro',controladorRegisClientes)
routerCliente.post('/cliente/login',controladorLoginClientes)
routerCliente.get('/cliente/generadores',controladorVerGeneradores)

export default routerCliente