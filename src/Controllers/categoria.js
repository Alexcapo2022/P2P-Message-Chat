import { response } from "../Utils/responses.js";
import { Categoria } from "../models/Categoria.js";
import { Libro } from "../models/Libro.js";

export const listarCategorias = async (req,res) => {
  try{
    const lista = await Categoria.findAll({
      where: {estado: 1},
      order:[['nombre','ASC']],
    });
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

export const listarLibrosPorCategoria = async (req, res) => {
  const { categoriaId } = req.params;

  try {
    const categoria = await Categoria.findByPk(categoriaId);

    if (!categoria) {
      return res.status(404).json(response(false, 'Categoría no encontrada', null));
    }

    const libros = await Libro.findAll({
      where: { categoria_id: categoriaId },
    });

    return res.status(200).json(response(true, 'Libros por categoría', libros));
  } catch (error) {
    console.error(error);
    return res.status(500).json(response(false, 'Error al obtener libros por categoría', null));
  }
};