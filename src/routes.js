import { Router } from 'express';
import { librosController } from './controller.js';

const router = Router();

router.get('/libros', librosController.getAll);
router.get('/libros/:id', librosController.getOne);

export default router;
