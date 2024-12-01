import bcrypt from "bcrypt";

const ModeloGenerador = {
  async createGeneradorModel(datos) {
    const respuesta = await fetch("http://localhost:4000/generador", {
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
    const peticion = await fetch("http://localhost:4000/generador");
    const generadores = await peticion.json();
    return generadores;
  },

  async getGeneradorByIdModel(Id) {
    const response = await fetch(`http://localhost:4000/generador/${Id}`);
    if (!response.ok) {
      return { error: "Generador no encontrado" };
    }
    const data = await response.json();
    return data;
  },

  async updateGeneradorModel(Id, updateModel) {
    const url = `http://localhost:4000/generador/${Id}`;
    const peticion = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(updateModel),
      headers: { "Content-Type": "application/json" },
    });
    const data = await peticion.json();
    return data;
  },

  async deleteGeneradorModel(tourId) {
    const url = `http://localhost:4000/generador/${tourId}`;
    const peticion = await fetch(url, {
      method: "DELETE",
    });
    const data = await peticion.json();
    return data;
  },
};

export default ModeloGenerador;
