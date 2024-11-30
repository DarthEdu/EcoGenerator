import Admin from "../Models/modeloAdministrador.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { json } from "express";
import { createToken } from "../Middleware/auth.js";
const ControladorCrearAdmin = async (req, res) => {
    const { nombre, contrasenia } = req.body
    try {
        const verificar = await Admin.VerificarAdmin(nombre)
        console.log(verificar)
        if (verificar) {
            res.status(404).json(verificar)
        } else {
            const nivelSal=10;
            const contraHasheada = await bcrypt.hash(contrasenia, nivelSal)
            const nuevoAdmin = {
                "id": uuidv4(),
                "nombre": nombre,
                "nombre de usuario": "admin",
                contrasenia: contraHasheada
            }
            const crearAdmin = await Admin.RegistrarAdmin(nuevoAdmin)
            if (!crearAdmin) {
                res.send("Admin no ingresado").status(404)
                console.log("NO HAY INFO DEL ADMIN PARA CREAR")
            } else {
                res.status(200).json(crearAdmin)
            }
        }
    } catch (error) {
        res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

const ControladorLoginAdmin = async (req, res) => {
    const { nombre, contrasenia } = req.body
    try {
        const autenticar = await Admin.LoginAdmin(nombre, contrasenia)
        const token = createToken(autenticar)
        const mostrar = {
            autenticar,
            token
        }
        if (!autenticar) {
            res.send("Credenciales no ingresadas").status(404)
            console.log("Ingresar credenciales")
        } else {
            res.status(200).json(mostrar)
        }
    } catch (error) {
        res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

const ControladorObtenerClientes = async (req, res) => {
    try{
        const usuarios = await Admin.ListarClientes()
        res.status(200).json(usuarios)
    }catch(error){
        res.status(500).json({"msg":"ERROR de conexión"})
    }
}

const ControladorActualizarClientes = async (req, res) =>{
    const {id} = req.params
    const nuevosDatos = {
        "id":id,
        ...req.body
    }
    try{
        const actualizacion = await Admin.ActualizarClientes(id,nuevosDatos)
        res.status(200).json(actualizacion)
    }catch(error){
        res.status(500).json({"msg":"ERROR de conexión"})
    }
}

const ControladorEliminarClientes = async (req, res) =>{
    const {id} = req.params
    try{
        Admin.EliminarClientes(id)
        res.status(200).json({"msg":"Eliminado correctamente"})
    }catch(error){
        res.status(500).json({"msg":"ERROR de conexión"})
    }
}

export { ControladorCrearAdmin,
        ControladorLoginAdmin,
        ControladorObtenerClientes,
        ControladorActualizarClientes,
        ControladorEliminarClientes}