import { response } from "../Utils/responses.js";
import { Libro } from "../models/Libro.js";
import { Orden } from "../models/Orden.js";

export const ordenUsuario = async (req,res) => {
  try{
    const {comprador_id} = req.params;
    const lista = await Orden.findAll({where: {comprador_id: comprador_id}, include: [{model: Libro, as: "libros"}]});
    
    return res.status(200).json(response(true, `Listado de ordenes de usuario ${comprador_id}`, lista))
  }catch(err){
    console.log(err);
    return res.status(500).json(response(false, "Error al listar las ordenes de usuario", null))
  }
}