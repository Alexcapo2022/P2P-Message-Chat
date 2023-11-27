import { Router } from "express";
import { login, perfil, regitrarUsuario, actualizarUsuario } from "../Controllers/usuario.js";
import { getUsuarioAutenticado } from "../Utils/middlewares.js";

export const usuarioRouter = Router();

usuarioRouter.route('/usuario').post(regitrarUsuario);
usuarioRouter.route('/usuario/login').post(login);
usuarioRouter.route('/usuario/perfil').get(getUsuarioAutenticado, perfil);
usuarioRouter.route('/usuario/perfil/actualizar').put(getUsuarioAutenticado, actualizarUsuario);

