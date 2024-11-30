import { ControladorCrearAdmin } from "../Controllers/controladorAdmin.js";
import { ControladorLoginAdmin } from "../Controllers/controladorAdmin.js";
import { Router } from "express";

const route = Router()

route.post('/administrador/registro', ControladorCrearAdmin)
route.post('/administrador/login', ControladorLoginAdmin)

export default route