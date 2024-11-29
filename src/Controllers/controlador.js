import Admin from "../Models/modeloAdministrador.js";
import {v4 as uuidv4} from 'uuid';

const ControladorCrearAdmin = async (req, res) =>{
    try{
        const nuevoAdmin = {
            id:uuidv4(),
            ...req.body
        }
        const crearAdmin = await Admin.RegistrarAdmin(nuevoAdmin)
        if(!crearAdmin){
            res.send("Admin no ingresado").status(404)
            console.log("NO HAY INFO DEL ADMIN PARA CREAR")
        }else{
            res.status(200).json(crearAdmin)
        }
    }catch(error){
        res.status(500).json({"msg":"ERROR de conexión"})
    }
}

const ControladorLoginAdmin = async (req, res)=>{
    try{
        const {nombre, password} = req.body
        const autenticar = await Admin.LoginAdmin(nombre, password)
        if(!autenticar){
            res.send("Credenciales no ingresadas").status(404)
            console.log("Ingresar credenciales")
        }else{
            res.status(200).json(autenticar)
        }
    }catch(error){
        res.status(500).json({"msg":"ERROR de conexión"})
    }
}


export {ControladorCrearAdmin, ControladorLoginAdmin}