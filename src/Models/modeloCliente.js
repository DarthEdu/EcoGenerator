import bcrypt from 'bcrypt';

const modeloClientes = {
    async registrarCliente(datos){
        const respuesta = await fetch(process.env.BDD_CLIENTES,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{'Content-Type':'application/json'}
        })
        if(!respuesta){
            console.log("Error")
            return {msg: "Error de conexión"}
        }
        const data = await respuesta.json()
        return data
    },
    async loginCliente(email,password){
        const peticion = await fetch(process.env.BDD_CLIENTES)
        if(!peticion.ok){
            return {"msg":"Error en obtener los recursos"}
        }else{
            const respuesta = await peticion.json()
            const cliente = respuesta.find(ce => ce.correo == email)
            if (!cliente){
                return {"msg":"Cliente no encontrado"}
            }
            const contra = await bcrypt.compare(password, cliente.contrasenia)
            if (cliente && contra) {
                console.log("Autenticación exitosa")
                return cliente
            } else {
                return { "msg": "Error de autenticación" }
            }
        }
    },
    async verificarClientes(correo) {
        if (!correo || typeof correo !== "string") {
            return { "msg": "Ingresa el correo correctamente" }
        } else {
            const conec = await fetch(process.env.BDD_CLIENTES)
            const respuesta = await conec.json()
            const verificacion = respuesta.find(email => email.correo === correo)
            if (verificacion) {
                return { "msg": "El cliente ya existe" }
            } else {
                return false
            }
        }
    }
}

export default modeloClientes