import {Router} from 'express';
import { obtenerLibro } from '../Controllers/libro.js';

export const libroRouter = Router();

libroRouter.route('/libro/:id').get(obtenerLibro);