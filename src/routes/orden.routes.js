import { Router } from "express";
export const ordenRouter = Router();

ordenRouter.route("/orden").post()
ordenRouter.route("/orden/:orden_id").get()
ordenRouter.route("/orden/:comprador_id").get(ordenUsuario)