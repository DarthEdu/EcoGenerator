import Admin from "../Models/modeloAdministrador.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { json } from "express";
import { createToken } from "../Middleware/auth.js";
const ControladorCrearAdmin = async (req, res) => {
    const { correo, contrasenia, nombre_de_usuario, nombre } = req.body
    try {
        const verificar = await Admin.VerificarAdmin(nombre_de_usuario, correo)
        if (!nombre || !correo || !contrasenia || !nombre_de_usuario) {
            return res.status(404).json({ "msg": "Ingresa el nombre, nombre de usuario, correo y contraseña" })
        }
        else if (verificar) {
            return res.status(404).json(verificar)
        } else {
            const nivelSal = 10;
            const contraHasheada = await bcrypt.hash(contrasenia, nivelSal)
            const nuevoAdmin = {
                "id": uuidv4(),
                "nombre": nombre,
                "nombre_de_usuario": nombre_de_usuario,
                "correo": correo,
                contrasenia: contraHasheada
            }
            const crearAdmin = await Admin.RegistrarAdmin(nuevoAdmin)
            if (!crearAdmin) {
                return res.send("Admin no ingresado").status(404)
                console.log("NO HAY INFO DEL ADMIN PARA CREAR")
            } else {
                return res.status(200).json(crearAdmin)
            }
        }
    } catch (error) {
        return res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

const ControladorLoginAdmin = async (req, res) => {
    const { nombre_de_usuario, contrasenia } = req.body
    try {
        if (!nombre_de_usuario || !contrasenia) {
            return res.status(404).json({ "msg": "Ingresa el nombre de usuario y contraseña" })
        }
        const autenticar = await Admin.LoginAdmin(nombre_de_usuario, contrasenia)
        console.log(autenticar)
        if (!autenticar) {
            console.log("No se ingresaron credenciales")
            return res.send("Credenciales no ingresadas").status(404)
        } else {
            if (autenticar.msg == 'Usuario no encontrado') {
                const mostrar = {
                    autenticar
                }
                return res.status(404).json(mostrar)
            } else {
                const token = createToken(autenticar)
                const mostrar = {
                    autenticar,
                    token
                }
                return res.status(200).json(mostrar)
            }
        }
    } catch (error) {
        return res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

const ControladorObtenerClientes = async (req, res) => {
    try {
        const usuarios = await Admin.ListarClientes()
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

const ControladorActualizarClientes = async (req, res) => {
    const { id } = req.params
    const nuevosDatos = {
        "id": id,
        ...req.body
    }
    try {
        if (!nuevosDatos) {
            return res.status(404).json({ "msg": "Ingresa nuevos datos para actualizar" })
        }
        const actualizacion = await Admin.ActualizarClientes(id, nuevosDatos)
        return res.status(200).json(actualizacion)
    } catch (error) {
        return res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

const ControladorEliminarClientes = async (req, res) => {
    const { id } = req.params
    try {
        await Admin.EliminarClientes(id)
        return res.status(200).json({ "msg": "Eliminado correctamente" })
    } catch (error) {
        return res.status(500).json({ "msg": "ERROR de conexión" })
    }
}

export {
    ControladorCrearAdmin,
    ControladorLoginAdmin,
    ControladorObtenerClientes,
    ControladorActualizarClientes,
    ControladorEliminarClientes
}