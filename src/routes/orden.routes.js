import { Router } from "express";
import { ordenUsuario } from "../Controllers/orden.js";
export const ordenRouter = Router();

ordenRouter.route("/orden").post()
ordenRouter.route("/orden/:orden_id").get()
ordenRouter.route("/orden/usuario/:comprador_id").get(ordenUsuario)