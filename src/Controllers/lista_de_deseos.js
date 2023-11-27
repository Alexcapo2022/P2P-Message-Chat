import { response } from "../Utils/responses.js";
import { Lista_De_Deseos } from "../models/ListaDeDeseos.js";
import { Libro } from "../models/Libro.js";
import { Autor } from "../models/Autor.js";
import { Editorial } from "../models/Editorial.js";
import { Categoria } from "../models/Categoria.js";
import { Imagen } from "../models/Imagen.js";

export const listarLibrosDeseados = async (req,res) => {
    try {
        const usuarioID = req.params.usuarioID;
    
        const listaDeseos = await Lista_De_Deseos.findAll({
          where: { Usuario_ID: usuarioID },
          attributes: ['Libro_ID'],
        });
    
        const librosDeseadosIDs = listaDeseos.map((registro) => registro.Libro_ID);
        
        const librosDeseados = await Libro.findAll({
            where: { Libro_ID: librosDeseadosIDs },
            include: [
              {
                model: Autor,
                attributes: ['nombre'],
                as: 'Autor', // Alias para evitar conflictos de nombres
              },
              {
                model: Editorial,
                attributes: ['nombre'],
                as: 'Editorial',
              },
              {
                model: Categoria,
                attributes: ['nombre'],
                as: 'Categoria',
              },
              {
                model: Imagen,
                attributes: ['url'],
                as: 'Imagen',
              },
            ],
            attributes: [
              'titulo',
              'precio',
              'fecha_publicacion',
              'numero_paginas',
              'estado_libro',
            ],
          });
      
          const combo = librosDeseados.map((libro) => ({
            titulo: libro.titulo,
            nombre_autor: libro.Autor.nombre,
            precio: libro.precio,
            nombre_editorial: libro.Editorial.nombre,
            nombre_categoria: libro.Categoria.nombre,
            fecha_publicacion: libro.fecha_publicacion,
            numero_paginas: libro.numero_paginas,
            estado_libro: libro.estado_libro,
            image_url: libro.Imagen.url,
          }));
        
    
        return res.status(200).json(response(true, "Lista de Deseos", combo));
      } catch (err) {
        console.log(err);
        return res.status(500).json(response(false, "Error al listar libros deseados del usuario.", null));
      }
}