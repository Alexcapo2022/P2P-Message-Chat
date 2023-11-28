import {Router} from 'express';
import { listarCategorias } from '../Controllers/categoria.js';

export const categoriaRouter = Router();

categoriaRouter.route('/categoria').get(listarCategorias);