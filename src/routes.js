import { Router } from 'express';
import { librosController } from './controller.js'; // Cambia 'libro' a 'librosController'

export const router = Router();

router.get('/libros', librosController.getAll);
router.get('/libro', librosController.getOne);
router.post('/libro', librosController.add);
router.delete('/libroisbn', librosController.deleteISBN); // Cambia 'libroisbn' a '/libroisbn'
router.delete('/libroID', librosController.deleteID); // Cambia 'libroID' a '/libroID'
router.put('/libro', librosController.update);
