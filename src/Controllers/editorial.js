import { response } from "../Utils/responses.js";
import { Editorial } from "../models/Editorial.js";

export const listarEditoriales = async (req,res) => {
  try{
    const lista = await Editorial.findAll({where: {estado: 1}});
    let combo = [];
    if(lista.length > 0){
      lista.forEach((item) => {
        combo.push({
          id: item.editorial_id,
          name: item.nombre
        })
      })
    }
    return res.status(200).json(response(true, "Lista de editoriales", combo))
  }catch(err){
    console.log(err);
    return res.status(500).json(response(false, "Error al listar las editoriales", null))
  }
}