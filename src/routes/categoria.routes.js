import {Router} from 'express';
import { listarCategorias, listarLibrosPorCategoria} from '../Controllers/categoria.js';

export const categoriaRouter = Router();

categoriaRouter.route('/categoria').get(listarCategorias);
categoriaRouter.route('/libros/:categoriaId').get(listarLibrosPorCategoria);