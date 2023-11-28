import { Router } from "express";
import { obtenerMetodosPago } from "../Controllers/MetodoPago.js";

export const metodoPagoRouter = Router();

metodoPagoRouter.route("/metodoPago").get(obtenerMetodosPago);