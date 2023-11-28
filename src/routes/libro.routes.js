import { Router } from 'express';
import { obtenerLibro, listarLibrosPorCategoria, obtenerLibros, crearLibro} from '../Controllers/libro.js';
import { getUsuarioAutenticado } from '../Utils/middlewares.js';

export const libroRouter = Router();

libroRouter.route('/libro/:id').get(obtenerLibro);
libroRouter.route('/libros/:categoriaId').get(listarLibrosPorCategoria);
libroRouter.route('/libros').get(obtenerLibros);
libroRouter.route('/crearLibro').post( getUsuarioAutenticado , crearLibro );