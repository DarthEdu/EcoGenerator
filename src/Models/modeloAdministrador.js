import bcrypt from 'bcrypt';
import { response } from 'express';

const Admin = {
    async RegistrarAdmin(datos) {
        const respuesta = await fetch("http://localhost:4000/administrador", {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!respuesta) {
            console.log("Error")
            return { msg: "Error de conexión" }
        }
        const resultado = await respuesta.json()
        return resultado
    },
    async LoginAdmin(username, password) {
        const objeto = await fetch('http://localhost:4000/administrador')
        if (!objeto.ok) {
            return { "msg": "Error en obtener los recursos" }
        } else {
            const respuesta = await objeto.json()
            const user = respuesta.find(pin => pin.nombre === username)
            if (!user) {
                console.log("Usuario no encontrado")
                return { "msg": "Usuario no encontrado" }
            }
            const contra = await bcrypt.compare(password, user.contrasenia)
            console.log(contra)
            if (user && contra) {
                console.log("Autenticación exitosa")
                return user
            } else {
                return { "msg": "Error de autenticación" }
            }
        }
    },
    async VerificarAdmin(nombre) {
        if (!nombre || typeof nombre !== "string") {
            return { "msg": "Ingresa el nombre correctamente" }
        } else {
            const conec = await fetch("http://localhost:4000/administrador")
            const respuesta = await conec.json()
            const verificacion = respuesta.find(nom => nom.nombre === nombre)
            if (verificacion) {
                return { "msg": "El administrador ya existe" }
            } else {
                return false
            }
        }
    },
    async ListarClientes(){
        const datos = await fetch("http://localhost:4000/usuario")
        const respuesta = await datos.json()
        console.log(respuesta)
        if(!respuesta){
            return {"msg":"No existen datos"}
        }else{
            return respuesta
        }
    },
    async ActualizarClientes(id, nuevaInfo){
        const datos = await fetch(`http://localhost:4000/usuario/${id}`, {
            method:'PUT',
            body: JSON.stringify(nuevaInfo),
            headers:{ 'Content-Type': 'application/json' }
        })
        const respuesta = await datos.json()
        if(!respuesta){
            return {"msg": "El usuario no existe"}
        }else{
            return respuesta
        }
    },
    async EliminarClientes(id){
        const datos = await fetch(`http://localhost:4000/usuario/${id}`,{
            method: 'DELETE',
        })
        const respuesta = await datos.json()
        if(!respuesta){
            return {"msg":"El usuario no existe"}
        }else{
            return respuesta
        }
    }
}

export default Admin