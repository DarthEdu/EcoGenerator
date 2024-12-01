
import ModeloGenerador from "../Models/modeloGenerador.js";
import { v4 as uuidv4 } from 'uuid';



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
        const generador = await ModeloGenerador.createGeneradorModel(newGeneradorData)
        res.status(201).json(generador)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteGeneradorController = async (req,res) => { 
    const {id} = req.params
    try {
        await ModeloGenerador.deleteGeneradorModel(id)
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

