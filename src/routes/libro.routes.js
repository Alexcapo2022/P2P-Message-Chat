import { Router } from 'express';
import { obtenerLibro, obtenerLibrosPorCategoria, obtenerLibros, crearLibro} from '../Controllers/libro.js';
import { getUsuarioAutenticado } from '../Utils/middlewares.js';

export const libroRouter = Router();

libroRouter.route('/libro/:id').get(obtenerLibro);
libroRouter.route('/categoria/:id').get(obtenerLibrosPorCategoria);
libroRouter.route('/libros').get(obtenerLibros);
libroRouter.route('/crearLibro').post( getUsuarioAutenticado , crearLibro );