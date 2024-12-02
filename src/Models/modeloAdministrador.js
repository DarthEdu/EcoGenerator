import bcrypt from 'bcrypt';

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
            const user = respuesta.find(pin => pin.nombre_de_usuario === username)
            if (!user) {
                console.log("Usuario no encontrado")
                return { "msg": "Usuario no encontrado" }
            }
            const contra = await bcrypt.compare(password, user.contrasenia)
            if (user && contra) {
                console.log("Autenticación exitosa")
                return user
            } else {
                return { "msg": "Error de autenticación" }
            }
        }
    },
    async VerificarAdmin(nom_Usuario, correo) {
        if (!correo || typeof correo !== "string" || !nom_Usuario || typeof nom_Usuario!=="string") {
            return { "msg": "Ingresa los datos correctamente" }
        } else {
            const conec = await fetch("http://localhost:4000/administrador")
            const respuesta = await conec.json()
            const verificacion = respuesta.find(mail => mail.correo === correo)
            const verificacionUsername= respuesta.find(nom => nom.nombre_de_usuario === nom_Usuario)
            if (verificacion) {
                return { "msg": "El administrador ya existe" }
            } else if (verificacionUsername){
                return { "msg": "El nombre de usuario ya esta en uso" }
            }else {
                return false
            }
        }
    },
    async ListarClientes(){
        const datos = await fetch("http://localhost:4000/clientes")
        const respuesta = await datos.json()
        if(!respuesta){
            return {"msg":"No existen datos"}
        }else{
            return respuesta
        }
    },
    async ActualizarClientes(id, nuevaInfo){
        const url = "http://localhost:4000/clientes"
        const conec=await fetch(url)
        const resultado = await conec.json()
        if(!resultado){
            return {"msg":"No se encuentra la base"}
        }
        const usuarioActual = resultado.find(ident => ident.id === id)
        if(!usuarioActual){
            return {"msg":"El usuario no existe"}
        }
        
        const contraFinal = nuevaInfo.contrasenia ? nuevaInfo.contrasenia : usuarioActual.contrasenia
        const usuarioFinal = {
            ...usuarioActual,
            ...nuevaInfo,
            contrasenia: contraFinal
        }

        const datos = await fetch(`http://localhost:4000/clientes/${id}`, {
            method:'PUT',
            body: JSON.stringify(usuarioFinal),
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
        const datos = await fetch(`http://localhost:4000/clientes/${id}`,{
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