import { Router, type Router as RouterType } from 'express';
import { StudentsController } from '../controllers/students.controller.js';

// ✅ Se anota el tipo explícitamente como RouterType (o Router)
export const studentsRouter: RouterType = Router();

studentsRouter.get('/', StudentsController.getAll);
studentsRouter.get('/:id', StudentsController.getById);
studentsRouter.post('/', StudentsController.create);
studentsRouter.put('/:id', StudentsController.update);
studentsRouter.delete('/:id', StudentsController.delete);