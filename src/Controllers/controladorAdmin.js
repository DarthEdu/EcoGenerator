import Admin from "../Models/modeloAdministrador.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

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
        console.log(autenticar)
        if (!autenticar) {
            res.send("Credenciales no ingresadas").status(404)
            console.log("Ingresar credenciales")
        } else {
            res.status(200).json(autenticar)
        }
    } catch (error) {
        res.status(500).json({ "msg": "ERROR de conexión" })
        console.log("NO CONECTA")
    }
}


export { ControladorCrearAdmin, ControladorLoginAdmin }