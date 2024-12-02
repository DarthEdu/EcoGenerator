import bcrypt from 'bcrypt';

const modeloClientes = {
    async registrarCliente(datos){
        const respuesta = await fetch("http://localhost:4000/clientes",{
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
        const peticion = await fetch('http://localhost:4000/clientes')
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
            const conec = await fetch("http://localhost:4000/clientes")
            const respuesta = await conec.json()
            const verificacion = respuesta.find(email => email.correo === correo)
            if (verificacion) {
                return { "msg": "El cliente ya existe" }
            } else {
                return false
            }
        }
    },
    async verGeneradores(){
        const datos = await fetch("http://localhost:4000/generador")
        const respuesta = await datos.json()
        console.log(respuesta)
        if(respuesta){
            return respuesta 
        }else{
            return {"msg":"No existen Generadores"} 
        }
    },
    async verGeneradorId(id){
        const response = await fetch(`http://localhost:4000/generador/${id}`);
        if (!response.ok){
            return { error: "Generador no encontrado" };
        }
        const data = await response.json();
        return data
    }

}

export default modeloClientes