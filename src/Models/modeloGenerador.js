import bcrypt from "bcrypt";
import dotenv from 'dotenv'

dotenv.config()


const ModeloGenerador = {
  async createGeneradorModel(datos) {
    const respuesta = await fetch(process.env.BDD_GENERADORES, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json" },
    });
    if (!respuesta) {
      console.log("Error");
      return { msg: "Error de conexión" };
    }
    const resultado = await respuesta.json();
    return resultado;
  },

  async getAllGeneradoresModel() {
    const peticion = await fetch(process.env.BDD_GENERADORES);
    const generadores = await peticion.json();
    return generadores;
  },

  async getGeneradorByIdModel(Id) {
    const response = await fetch(`${process.env.BDD_GENERADORES}/${Id}`);
    if (!response.ok) {
      return { error: "Generador no encontrado" };
    }
    const data = await response.json();
    return data;
  },

  async updateGeneradorModel(Id, updateModel) {
    const url = `${process.env.BDD_GENERADORES}/${Id}`;
    const peticion = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(updateModel),
      headers: { "Content-Type": "application/json" },
    });
    const data = await peticion.json();
    return data;
  },

  async deleteGeneradorModel(tourId) {
    const url = `${process.env.BDD_GENERADORES}/${tourId}`;
    const peticion = await fetch(url, {
      method: "DELETE",
    });
    const data = await peticion.json();
    return data;
  },
};

export default ModeloGenerador;
