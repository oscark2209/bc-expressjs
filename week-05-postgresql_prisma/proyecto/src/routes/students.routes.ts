import { Router } from 'express';
import { StudentsController } from '../controllers/students.controller';

const router = Router();

router.get('/:id', StudentsController.getById);

export default router;