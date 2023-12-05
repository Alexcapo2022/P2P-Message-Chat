import { Op } from 'sequelize';
import { response } from "../Utils/responses.js";
import { Autor } from "../models/Autor.js";
import { Categoria } from "../models/Categoria.js";
import { Editorial } from "../models/Editorial.js";
import { Libro } from "../models/Libro.js";
import { Imagen } from "../models/Imagen.js";
import { Usuario } from "../models/Usuario.js";
import { Direccion } from "../models/Direccion.js";

//Recibe un id de libro y retorna el libro
export const obtenerLibro = async (req, res) => {
   const { id } = req.params;
   console.log(id);
   try {
      const libro = await Libro.findByPk(Number(id), {
         attributes: {
            exclude: ["createdAt", "updatedAt", "autor_id" , "categoria_id", "editorial_id"],
         },
         include: [
            { model: Categoria, as: "categoria", attributes: ["nombre"] },
            { model: Autor, as: "autor", attributes: ["nombre"] },
            { model: Editorial, as: "editorial", attributes: ["nombre"] },
            { model: Imagen, as: "imagen", attributes: ["url"], limit: 1 },
            { model: Usuario, as: "vendedor",
              attributes: ["nombre", "apellido", "usuario_id"],
              include: [
                { model: Direccion, as:"direccion", attributes: ["distrito"], },
              ],
            },
         ],
      });
      console.log(libro);

      if (!libro) {
         return res.status(404).json(response(false, "Libro no encontrado", null));
      }

      const libroFormato = {
        id: libro.libro_id,
        titulo: libro.titulo,
        isbn:libro.isbn,
        sinopsis: libro.sinopsis,
        idioma:libro.idioma,
        numero_paginas:libro.numero_paginas,
        precio: libro.precio,
        encuadernacion: libro.encuadernacion,
        estado: libro.estado_libro,
        categoria: libro.categoria.nombre,
        imagen_url: libro.imagen.length > 0 ? libro.imagen[0].url : null,
        autor: libro.autor.nombre,
        editorial: libro.editorial.nombre,
        vendedor: {
            id: libro.vendedor.usuario_id,
            nombre: libro.vendedor.nombre,
            apellido: libro.vendedor.apellido,
            ubicacion: libro.vendedor.direccion.distrito,
        },
      };
      
      return res.status(200).json(response(true, "Libro encontrado", libroFormato));
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al obtener el libro", null));
   }
};

//Recibe una cadena y retorna una lista de libros
export const obtenerLibros = async (req, res) => {

  try{
    const lista = await Libro.findAll({
      attributes: ["libro_id","titulo","sinopsis","precio","estado_libro","encuadernacion"],
      include: [
        { model: Categoria, as: "categoria",attributes: ["nombre"],},
        { model: Imagen, as: "imagen", attributes: ["url"], limit: 1 },
        { model: Autor, as: "autor", attributes: ["nombre"], },
        { model: Editorial, as: "editorial" , attributes: ["nombre"], },
        { model: Usuario, as: "vendedor",
          attributes: ["nombre", "apellido", "usuario_id"],
          include: [
            { model: Direccion, as:"direccion", attributes: ["distrito"], },
          ],
        },
      ],
      where: {estado: 1},
    });

    let combo=[];

    if(lista.length > 0){
      lista.forEach((item) => {
        combo.push({
          id: item.libro_id,
          titulo: item.titulo,
          sinopsis: item.sinopsis,
          precio: item.precio,
          encuadernacion: item.encuadernacion,
          estado:item.estado_libro,
          categoria: item.categoria.nombre,
          imagen_url: item.imagen.length > 0 ? item.imagen[0].url : null,
          autor: item.autor.nombre,
          editorial:item.editorial.nombre,
          vendedor:{
            id:item.vendedor.usuario_id,
            nombre: item.vendedor.nombre,
            apellido:item.vendedor.apellido,
            ubicacion: item.vendedor.direccion.distrito,
          },
        })
      })
    }

    return res.status(200).json(response(true, "Se encontraron libros", combo));
  } catch (err) {
    console.log(err);
    return res.status(500).json(response(false, "Error al buscar libros", null));
  }
};

export const obtenerLibrosPorCategoria = async (req, res) => {
   const { id } = req.params;
 
   try {
     //Busca por ID en la tabla categoria
     const categoria = await Categoria.findByPk(Number(id));
 
     //Si no encuentra ninguno, retorna error (lo cual no debería pasar)
     if (!categoria) {
       return res.status(404).json(response(false, `Categoría ${id} no encontrada`, null));
     }
 
     const libros = await Libro.findAll({
      attributes: ["libro_id","titulo","sinopsis","precio","estado_libro","encuadernacion"],
      include: [
        { model: Categoria, as: "categoria",attributes: ["nombre"],},
        { model: Imagen, as: "imagen", attributes: ["url"], limit: 1 },
        { model: Autor, as: "autor", attributes: ["nombre"], },
        { model: Editorial, as: "editorial" , attributes: ["nombre"], },
        { model: Usuario, as: "vendedor",
          attributes: ["nombre", "apellido", "usuario_id"],
          include: [
            { model: Direccion, as:"direccion", attributes: ["distrito"], },
          ],
        },
      ],
       where: { categoria_id: id,
                estado: 1 },

     });
 
     return res.status(200).json(response(true, 'Libros por categoría', libros));
   } catch (error) {
     console.error(error);
     return res.status(500).json(response(false, 'Error al obtener libros por categoría', null));
   }
 };

 export const crearLibro = async (req, res) => {
  try {
    const { usuario_id } = req.user;
    const {
      titulo,
      estado_libro,
      isbn,
      idioma,
      numero_paginas,
      fecha_publicacion,
      precio,
      encuadernacion,
      sinopsis,
      autor,
      editorial,
      categoria,
    } = req.body;
    console.log(titulo)

    // Busca o crea el autor
    const [nuevoAutor] = await Autor.findOrCreate({
      where: { nombre: autor },
    });

    // Busca o crea la editorial
    const [nuevaEditorial] = await Editorial.findOrCreate({
      where: { nombre: editorial },
    });

    // Busca o crea la categoría
    const [nuevaCategoria] = await Categoria.findOrCreate({
      where: { nombre: categoria },
    });

    // Crea el libro en la base de datos
    const nuevoLibro = await Libro.create({
      titulo,
      estado_libro,
      isbn,
      idioma,
      numero_paginas,
      fecha_publicacion,
      precio,
      encuadernacion,
      sinopsis,
      autor_id: nuevoAutor.autor_id,
      editorial_id: nuevaEditorial.editorial_id,
      categoria_id: nuevaCategoria.categoria_id,
      vendedor_id: usuario_id,
    });


    // Responde con el libro creado
    return res.status(200).json(response(true, 'Libro creado', nuevoLibro));
  } catch (error) {
    console.error('Error al crear libro:', error);
    return res.status(500).json(response(false, 'Error al crear libro', null));
  }
};



export const actualizarEstadoLibro = async (id, estado) => {
   try {
      const libro = await Libro.findByPk(Number(id));
      if (!libro) {
         return false;
      }
      libro.estado = estado;
      await libro.save();
      return true;
   } catch (err) {
      console.log(err);
      return false;
   }
}
