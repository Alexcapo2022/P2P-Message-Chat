import { Op } from 'sequelize';
import { response } from "../Utils/responses.js";
import { Autor } from "../models/Autor.js";
import { Categoria } from "../models/Categoria.js";
import { Editorial } from "../models/Editorial.js";
import { Libro } from "../models/Libro.js";

//Recibe un id de libro y retorna el libro
export const obtenerLibro = async (req, res) => {
   const { id } = req.params;
   console.log(id);
   try {
      const libro = await Libro.findByPk(Number(id), {
         attributes: {
            exclude: ["createdAt", "updatedAt", "autor_id", "categoria_id", "editorial_id"],
         },
         include: [
            { model: Categoria, as: "categoria", attributes: ["nombre"] },
            { model: Autor, as: "autor", attributes: ["nombre"] },
            { model: Editorial, as: "editorial", attributes: ["nombre"] },
         ],
      });
      console.log(libro);

      if (!libro) {
         return res.status(404).json(response(false, "Libro no encontrado", null));
      }
      return res.status(200).json(response(true, "Libro encontrado", libro));
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al obtener el libro", null));
   }
};

//Recibe una cadena y retorna una lista de libros
export const buscarLibros = async (req, res) => {

  try {
    const { busqueda } = req.body;
    console.log(busqueda)

    const librosEncontrados = await Libro.findAll({
      attributes: ['libro_id', 'titulo', 'estado_libro', 'precio'],
      include: [
        {
          model: Autor, as: 'autor', attributes: ['nombre'],
          where: { nombre: { [Op.iLike]: `%${busqueda}%`, },},
        },
        {
          model: Categoria, as: 'categoria', attributes: ['nombre'],
          where: { nombre: {[Op.iLike]: `%${busqueda}%`,}, },
        },
      ],
      where: {
        [Op.or]: [
          {
            titulo: {
              [Op.iLike]: `%${busqueda}%`,},
          },
          {
            '$autor.nombre$': {
              [Op.iLike]: `%${busqueda}%`,},
          },
          {
            '$categoria.nombre$': {
              [Op.iLike]: `%${busqueda}%`,},
          },
        ],
      },
    });
    console.log(librosEncontrados);

   // let libros = []


   //  if(librosEncontrados.length>0){
   //    librosEncontrados.forEach((item) => {
   //       libros.push({
   //         id: item.libro_id,
   //         title: item.titulo,
   //         book_state: item.estado_libro,
   //         price: item.price,
   //         //------------ vendedor: usuario_id (fk) / ciudad: direccion.ciudad on usuario_id
   //       })
   //     })
   //  }

    return res.status(200).json(response(true, "Se encontraron libros", librosEncontrados));
  } catch (error) {
    console.error(error);
    return res.status(500).json(response(false, "Error al buscar libros", null));
  }
};

export const listarLibrosPorCategoria = async (req, res) => {
   const { categoriaId } = req.params;
 
   try {
     //Busca por ID en la tabla categoria
     const categoria = await Categoria.findByPk(categoriaId);
 
     //Si no encuentra ninguno, retorna error (lo cual no debería pasar)
     if (!categoria) {
       return res.status(404).json(response(false, 'Categoría no encontrada', null));
     }
 
     const libros = await Libro.findAll({
       where: { categoria_id: categoriaId },
       //include attributes
     });
 
     return res.status(200).json(response(true, 'Libros por categoría', libros));
   } catch (error) {
     console.error(error);
     return res.status(500).json(response(false, 'Error al obtener libros por categoría', null));
   }
 };

 export const crearLibro = async (req, res) => {
  try {
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
    // Realiza alguna validación de datos aquí si es necesario

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
    });

    // Responde con el libro creado
    return res.status(200).json(response(true, 'Libro creado', nuevoLibro));
  } catch (error) {
    console.error('Error al crear libro:', error);
    return res.status(500).json(response(false, 'Error al crear libro', null));
  }
};
