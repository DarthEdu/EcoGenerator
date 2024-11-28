// Requerir los módulos
import express from 'express'
import morgan from 'morgan'


// Inicializaciones
const app = express()
app.use(morgan('dev'))


// Variables
app.set('port',process.env.port || 3000)


// Middlewares 
app.use(express.json())


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Exportar la instancia de express por medio de app
export default  app