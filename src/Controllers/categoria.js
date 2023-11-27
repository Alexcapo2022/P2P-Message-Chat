import { response } from "../Utils/responses.js";
import { Categoria } from "../models/Categoria.js";

export const listarCategorias = async (req,res) => {
  try{
    const lista = await Categoria.findAll({where: {estado: 1}});
    let combo = [];
    if(lista.length > 0){
      lista.forEach((item) => {
        combo.push({
          id: item.categoria_id,
          name: item.nombre
        })
      })
    }
    return res.status(200).json(response(true, "Lista de categorias", combo))
  }catch(err){
    console.log(err);
    return res.status(500).json(response(false, "Error al listar las categorias", null))
  }
}