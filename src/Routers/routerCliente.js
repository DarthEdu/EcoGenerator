import { controladorRegisClientes,controladorLoginClientes,controladorVerGeneradores, controladorVerGeneradorId } from "../Controllers/controladorCliente.js";
import { Router } from "express";
import { getAllGeneradorControllerByID, getAllGeneradoresController} from '../Controllers/controladorGenerador.js'

const routerCliente = Router()

//publicas
//Enpoints de Registro y Login
routerCliente.post('/cliente/registro',controladorRegisClientes)
routerCliente.post('/cliente/login',controladorLoginClientes)


export default routerCliente