import { response } from "../Utils/responses.js";
import { Usuario } from "../models/Usuario.js";

export const regitrarUsuario = async (req, res) => {
   try {
      const { nombre, apellido, dni, correo, password, telefono } = req.body;
      //valida si el correo ya esta registrado
      const existeUsuario = await Usuario.findOne({ where: { correo } });
      if (existeUsuario) {
         return res.status(400).json(response(false, "El correo ya esta registrado", null));
      }
      const nuevoUsuario = await Usuario.create({
         nombre,
         apellido,
         correo,
         password,
         dni,
         telefono,
      });
      return res
         .status(201)
         .json(
            response(true, "Usuario registrado correctamente", {
               id: nuevoUsuario.getDataValue("usuario_id"),
            })
         );
   } catch (err) {
      console.log(err);
      return res.status(500).json(response(false, "Error al registrar el usuario", null));
   }
};
