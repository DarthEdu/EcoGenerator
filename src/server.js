// Requerir los módulos
import express from 'express'
import morgan from 'morgan'
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import routeAdmin from './Routers/routerAdmin.js'
import routeGenerador from './Routers/routerGenerador.js'
import routerCliente from './Routers/routerCliente.js'

// Inicializaciones
const app = express()
dotenv.config()
app.use(morgan('dev'))

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(fileUpload({
useTempFiles : true,
tempFileDir : './uploads'
}));

// Variables
app.set('port',process.env.port || 3000)


// Middlewares 
app.use(express.json())


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use('/ecoGenerator', routeAdmin)

// ruta generador
app.use('/ecoGenerator', routeGenerador)

// ruta cliente
app.use('/ecoGenerator',routerCliente)

// Exportar la instancia de express por medio de app
export default  app