import { compararPassword, encriptarPassword } from "../Utils/encriptacion.js";
import { response } from "../Utils/responses.js";
import { generarJWT } from "../Utils/validacion.js";
import { Direccion } from "../models/Direccion.js";
import { Usuario } from "../models/Usuario.js";

export const regitrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, dni, correo, password, telefono } = req.body;
    //valida si el correo ya esta registrado
    const existeUsuario = await Usuario.findOne({ where: { correo } });
    if (existeUsuario) {
      return res.status(400).json(response(false, "El correo ya esta registrado", null));
    }
    //se encripta la contraseña
    const hashedPassword = await encriptarPassword(password);

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      password: hashedPassword,
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

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    //valida si existe el correo 
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json(response(false, "Usuario no encontrado", null));
    }
    //valida password
    const passwordValido = await compararPassword(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json(response(false, "Contraseña incorrecta", null));
    }
    //genera token que dura 2 horas
    const token = generarJWT(usuario.getDataValue("usuario_id"));
    return res.status(200).json(response(true, "Usuario logueado correctamente", { token }));
  } catch (err) {
    console.log(err);
    return res.status(500).json(response(false, "Error al loguear el usuario", null));
  }
}

export const perfil = async (req, res) => {
  try {
    const { usuario_id } = req.user;
    const usuario = await Usuario.findByPk(usuario_id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "estado"],
      },
      include: [
        { model: Direccion, as: "direccion", attributes: { exclude: ["estado", "usuario_id"] } }
      ]
    });
    return res.status(200).json(response(true, "Perfil de usuario", usuario));
  } catch (err) {
    console.log(err)
  }
}

export const actualizarUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.user;
    const { nombre, apellido, dni, telefono, direccion, correo, password, fotoperfil } = req.body;
    console.log(req.body)
    // Actualizar la información del usuario
    const usuario = await Usuario.findByPk(usuario_id, {
      include: [{ model: Direccion, as: 'direccion' }],
    });

    if (!usuario) {
      return res.status(404).json(response(false, "Usuario no encontrado", null));
    }
    if(password){
      const hashedPassword = await encriptarPassword(password);
      usuario.password = hashedPassword;
    }

    // console.log('Contraseña original:', password);
    // console.log('Contraseña hasheada:', hashedPassword);

    // Actualizar campos específicos del usuario
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.dni = dni;
    usuario.telefono = telefono;
    usuario.correo = correo;
    usuario.fotoperfil = fotoperfil;

    // Guardar los cambios en la base de datos
    await usuario.save();

    return res.status(200).json(response(true, "Perfil de usuario actualizado", usuario));
  } catch (err) {
    console.log(err);
    return res.status(500).json(response(false, "Error al actualizar el perfil del usuario", null));
  }
};


