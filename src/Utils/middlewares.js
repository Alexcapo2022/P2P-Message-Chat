import { Usuario } from "../models/Usuario.js";
import { response } from "./responses.js"
import { validarJWT } from "./validacion.js";

export const getUsuarioAutenticado = async (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json(response(false, "No se ha enviado el token de acceso", null))
  }

  const token = req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(401).json(response(false, "No se ha enviado el token de acceso", null))
  }

  const result = validarJWT(token);
  if(typeof result === "string"){
    return res.status(401).json(response(false, result, null))
  }

  const usuario = await Usuario.findByPk(result.id);
  req.user = usuario;
  next();
}