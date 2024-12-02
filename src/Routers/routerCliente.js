import { controladorRegisClientes,controladorLoginClientes,controladorVerGeneradores} from "../Controllers/controladorCliente.js";
import { Router } from "express";

const routerCliente = Router()

//publicas
//Enpoints de Registro y Login
routerCliente.post('/cliente/registro',controladorRegisClientes)
routerCliente.post('/cliente/login',controladorLoginClientes)

export default routerCliente