import { Router } from 'express';
import { lessonController } from '../controllers/lesson.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createLessonSchema, updateLessonSchema } from '../schemas/lesson.schema';

const router = Router();
router.use(authMiddleware);
router.get('/', lessonController.getAll);
router.get('/:id', lessonController.getById);
router.post('/', validate(createLessonSchema), lessonController.create);
router.patch('/:id', validate(updateLessonSchema), lessonController.update);
router.delete('/:id', lessonController.delete);
export default router;