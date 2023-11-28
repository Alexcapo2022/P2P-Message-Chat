import { estadoLibro, estadoOrden } from "../Utils/constants.js";
import { response } from "../Utils/responses.js";
import { Libro } from "../models/Libro.js";
import { Orden } from "../models/Orden.js";
import { Orden_Detalle } from "../models/OrdenDetalle.js";
import { actualizarEstadoLibro } from "./libro.js";

export const ordenUsuario = async (req, res) => {
   try {
      const { comprador_id } = req.params;
      const lista = await Orden.findAll({
         where: { comprador_id: comprador_id },
         include: [{ model: Libro, as: "libros" }],
      });

      return res
         .status(200)
         .json(response(true, `Listado de ordenes de usuario ${comprador_id}`, lista));
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al listar las ordenes de usuario", null));
   }
};

export const crearOrden = async (req, res) => {
   try {
      const { usuario_id } = req.user;
      const { vendedor_id, libros, metodopago_id, fecha, monto } = req.body;
      const orden = await Orden.create({
         vendedor_id,
         metodopago_id,
         comprador_id: usuario_id,
         orden_fecha: fecha,
         monto_total: monto,
         estado_orden: estadoOrden.pendiente,
      });
      console.log(libros);
      const detalle = await Orden_Detalle.bulkCreate(
         libros.map((libro) => ({
            orden_id: orden.getDataValue("orden_id"),
            libro_id: libro,
         }))
      );

      libros.forEach(async (element) => {
        await actualizarEstadoLibro(element, estadoLibro.vendido);
      });

      console.log(detalle)
      
      return res.status(200).json(response(true, "Orden creada", orden));
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al crear la orden", null));
   }
};

export const actualizarEstadoOrden = async (id,estado) => {
    try {
        const orden = await Orden.findByPk(Number(id));
        if (!orden) {
          return false;
        }
        orden.estado_orden = estado;
        await orden.save();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
