import {Router} from 'express';
import { listarEditoriales } from '../Controllers/editorial.js';

export const editorialRouter = Router();

editorialRouter.route('/editorial').get(listarEditoriales);