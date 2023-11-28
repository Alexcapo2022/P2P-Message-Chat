import { response } from "../Utils/responses.js";
import { Orden } from "../models/Orden.js";

export const ordenUsuario = async (req,res) => {
  try{
    const userId = req.params.userId;
    const lista = await Orden.findAll({where: {comprador_id: userId}});
    let combo = [];
    if(lista.length > 0){
      lista.forEach((item) => {
        combo.push({
          id: item.estado,
          name: item.nombre
        })
      })
    }
    return res.status(200).json(response(true, `Listado de ordenes de usuario ${userId}`, combo))
  }catch(err){
    console.log(err);
    return res.status(500).json(response(false, "Error al listar las ordenes de usuario", null))
  }
}