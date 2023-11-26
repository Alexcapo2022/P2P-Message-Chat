import { response } from "../Utils/responses.js";
import { Autor } from "../models/Autor.js";

export const listarAutores = async (req,res) => {
  try{
    const lista = await Autor.findAll({where: {estado: 1}});
    let combo = [];
    if(lista.length > 0){
      lista.forEach((item) => {
        combo.push({
          id: item.autor_id,
          name: item.nombre
        })
      })
    }
    return res.status(200).json(response(true, "Lista de autores", combo))
  }catch(err){
    console.log(err);
    return res.status(500).json(response(false, "Error al listar las autores", null))
  }
}