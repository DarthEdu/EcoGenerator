// Requerir los módulos
import express from 'express'
import morgan from 'morgan'
import route from './Routers/routerAdmin.js'

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

app.use('/ecoGenerator/', route)

// Exportar la instancia de express por medio de app
export default  app