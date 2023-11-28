import { response } from "../Utils/responses.js";
import { Autor } from "../models/Autor.js";
import { Categoria } from "../models/Categoria.js";
import { Editorial } from "../models/Editorial.js";
import { Libro } from "../models/Libro.js";

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
