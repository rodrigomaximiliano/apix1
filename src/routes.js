import { Router } from 'express';
import { librosController } from './controller.js';




router.get('/libros', librosController.getAll);
router.get('/libros/:id', librosController.getOne);
router.post('/libros', librosController.create); // Ruta para crear un libro
router.put('/libros/:id', librosController.update); // Ruta para actualizar un libro
router.delete('/libros/isbn/:isbn', librosController.deleteByISBN); // Ruta para eliminar un libro por ISBN

export default router;
