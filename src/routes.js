import { Router } from 'express';
import { librosController } from './controller.js'; 

export const router = Router();

router.get('/libros', librosController.getAll);
router.get('/libro', librosController.getOne);
router.post('/libro', librosController.add);
router.delete('/libroisbn', librosController.deleteISBN); 
router.delete('/libroID', librosController.deleteID); 
router.put('/libro', librosController.update);
