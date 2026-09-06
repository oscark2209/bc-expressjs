import { Router } from 'express';
import { studentsController } from '../controllers/students.controller.js';

const router = Router();

router.get('/', studentsController.getAll.bind(studentsController));
router.get('/:id', studentsController.getById.bind(studentsController));
router.post('/', studentsController.create.bind(studentsController));
router.put('/:id', studentsController.update.bind(studentsController));
router.delete('/:id', studentsController.remove.bind(studentsController));

export const studentsRouter = router;