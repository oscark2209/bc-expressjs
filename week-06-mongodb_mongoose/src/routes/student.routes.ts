import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createStudentSchema, updateStudentSchema } from '../schemas/student.schema';

const router = Router();
router.use(authMiddleware);
router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', validate(createStudentSchema), studentController.create);
router.patch('/:id', validate(updateStudentSchema), studentController.update);
router.delete('/:id', studentController.delete);
export default router;