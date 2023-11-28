import { response } from "../Utils/responses.js";
import { Categoria } from "../models/Categoria.js";
import { Libro } from "../models/Libro.js";

//No hay input, solo retorna una lista con las categorias
export const listarCategorias = async (req,res) => {
  try{
    const lista = await Categoria.findAll({
      where: {estado: 1},
      order:[['nombre','ASC']],
    });
    let combo = [];
    
    //Esta parte le da el formato al response, para que tenga la forma de la interfaz en el frontend
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


