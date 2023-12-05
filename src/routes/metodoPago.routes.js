import { Router } from "express";
import { obtenerMetodosPago } from "../Controllers/metodoPago.js";

export const metodoPagoRouter = Router();

metodoPagoRouter.route("/metodoPago").get(obtenerMetodosPago);