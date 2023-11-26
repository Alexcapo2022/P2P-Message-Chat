import { Router } from "express";
import { regitrarUsuario } from "../Controllers/usuario.js";


export const usuarioRouter = Router();

usuarioRouter.route('/usuario').post(regitrarUsuario)