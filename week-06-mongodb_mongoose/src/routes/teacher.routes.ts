import { Router } from 'express';
import { TeacherController } from '../controllers/teacher.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createTeacherSchema, updateTeacherSchema } from '../schemas/teacher.schema';
const router = Router();
const controller = new TeacherController();

// Todas las rutas del recurso exigen autenticación por cookie HttpOnly
router.use(authMiddleware);

router.get('/', controller.getTeachers);
router.get('/:id', controller.getTeacherById);
router.post('/', validate(createTeacherSchema), controller.createTeacher);
router.patch('/:id', validate(updateTeacherSchema), controller.updateTeacher);
router.delete('/:id', controller.deleteTeacher);

export const teacherRouter = router;
export default router;