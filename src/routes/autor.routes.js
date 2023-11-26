import {Router} from 'express';
import { listarAutores } from '../Controllers/autor.js';

export const autorRouter = Router();

autorRouter.route('/autor').get(listarAutores);