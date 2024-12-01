import modeloClientes from "../Models/modeloCliente.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import { json } from "express";


const controladorRegisClientes = async (req, res) => {
    const { nombre, correo, contrasenia } = req.body
    try {
        const verificar = await modeloClientes.verificarClientes(correo)
        console.log(verificar);
        if (verificar) {
            return res.status(400).json({ msg: "El cliente ya existe" });
        } else {
            const nivelSal = 10;
            const contraHasheada = await bcrypt.hash(contrasenia, nivelSal)
            const nuevoCliente = {
                "id": uuidv4(),
                nombre,
                correo,
                contrasenia: contraHasheada,
                fechaCreacion: new Date().toISOString()
            };
            const crearCliente = await modeloClientes.registrarCliente(nuevoCliente);
            if (!crearCliente) {
                return res.status(400).json({ msg: "Error al registrar el cliente" });
            } else {
                res.status(201).json({ msg: "Cliente creado con éxito", cliente: crearCliente });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: "Error de conexión", error: error.message });
    }
}
const controladorLoginClientes = async (req,res)=>{
    const {correo,contrasenia}=req.body
    try{
        const autenticar = await modeloClientes.loginCliente(correo,contrasenia)
        const mostrar ={
            autenticar
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
const controladorVerGeneradores = async(req, res)=>{
    try {
        const generador = await modeloClientes.verGeneradores()
        res.status(200),json(generador)
    } catch (error) {
        res.status(500).json({"msg":"Error de conexion"}) 
    } // revisar
}
export{controladorRegisClientes,controladorLoginClientes,controladorVerGeneradores}