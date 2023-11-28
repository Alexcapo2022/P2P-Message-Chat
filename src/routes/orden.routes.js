import { Router } from "express";
import { crearOrden, ordenUsuario } from "../Controllers/orden.js";
import { getUsuarioAutenticado } from "../Utils/middlewares.js";
export const ordenRouter = Router();

ordenRouter.route("/orden").post(getUsuarioAutenticado, crearOrden)
ordenRouter.route("/orden/:orden_id").get()
ordenRouter.route("/orden/usuario/:comprador_id").get(ordenUsuario)