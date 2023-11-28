import { response } from "../Utils/responses.js";
import { MetodoPago } from "../models/MetodoPago.js";

export const obtenerMetodosPago = async (req, res) => {
   try {
      const lista = await MetodoPago.findAll();
      return res.status(200).json(response(true, "Listado de metodos de pago", lista));
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al listar los metodos de pago", null));
   }
};
