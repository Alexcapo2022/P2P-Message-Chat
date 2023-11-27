import { Router } from "express";
import { getSessionToken } from "../Controllers/pagos.js";
import { getUsuarioAutenticado } from "../Utils/middlewares.js";

export const pagoRouter = Router();

pagoRouter.route("/pago").post(getUsuarioAutenticado,getSessionToken)