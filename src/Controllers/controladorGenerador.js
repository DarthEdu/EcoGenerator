
import ModeloGenerador from "../Models/modeloGenerador.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra'
import { v2 as cloudinary } from 'cloudinary'




const getAllGeneradoresController = async(req,res) => {
    const generador = await ModeloGenerador.getAllGeneradoresModel()
    res.status(200).json(generador)
}

const getAllGeneradorControllerByID = async (req, res) => {
    const {id} = req.params
    try {
        const generador = await ModeloGenerador.getGeneradorByIdModel(id)
        const status = generador.error ? 404 : 200
        res.status(status).json(generador)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createGeneradorController = async (req,res) => {
    const newGeneradorData = {
        id:uuidv4(),
        ...req.body
    }
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'generador'})
        console.log(cloudinaryResponse)
        newGeneradorData.imagen = cloudinaryResponse.secure_url
        newGeneradorData.public_id= cloudinaryResponse.public_id
        const generador = await ModeloGenerador.createGeneradorModel(newGeneradorData)
        await fs.unlink(req.files.imagen.tempFilePath)
        res.status(201).json(generador)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteGeneradorController = async (req,res) => { 
    const {id} = req.params
    try {
        const pruebas = ModeloGenerador.deleteGeneradorModel(id)
        console.log(pruebas)
        res.status(200).json({msg:"Generador eliminado con exito"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateGeneradorController = async(req,res) => {
    const {id} = req.params
    try {
        const generador = await ModeloGenerador.updateGeneradorModel(id,req.body)
        res.status(200).json(generador)
    } catch (error) {
        req.status(500).json(error)
    }
}

export{
    getAllGeneradoresController,
    getAllGeneradorControllerByID,
    createGeneradorController,
    deleteGeneradorController,
    updateGeneradorController
}

