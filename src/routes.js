import { Router } from 'express';
import { librosController } from './controller.js';



const router = Router();

router.get('/libros', librosController.getAll);
router.get('/libros/:id', librosController.getOne);

router.put('/libros/:id', librosController.update); // Ruta para actualizar un libro
router.delete('/libros/isbn/:isbn', librosController.deleteByISBN); // Ruta para eliminar un libro por ISBN

export default router;
