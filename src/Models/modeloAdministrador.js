import bcrypt from 'bcrypt';

const Admin = {
    async RegistrarAdmin(datos){
        const respuesta = await fetch("http://localhost:4000/administrador", {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {'Content-Type':'application/json'}
        })
        if(!respuesta){
            console.log("Error")
            return {msg:"Error de conexión"}
        }
        const resultado = await respuesta.json()
        return resultado
    },
    async LoginAdmin(username, password){
        const objeto = await fetch(`http://localhost:4000/administrador`,{
            method:'POST',
            headers: {'Content-Type':'application/json'}
        })

        const respuesta = await objeto.json()
        const user = respuesta.administrador.find(pin => pin.nombre === username)
        if(!user){
            console.log("Usuario no encontrado")
            return {"msg": "Usuario no encontrado"}
        }
        const contra = await bcrypt.compare(user.password , password)
        if(user && contra){
            console.log("Autenticación exitosa")
            return user
        }else{
            return {"msg":"Error de autenticación"}
        }

    }
}

export default Admin