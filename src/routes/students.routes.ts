import { Router } from 'express';
import { 
  getStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/student.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { createStudentSchema, updateStudentSchema } from '../schemas/student.schema';

const router = Router();

// Definición de las rutas de estudiantes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', validateSchema(createStudentSchema), createStudent);
router.put('/:id', validateSchema(updateStudentSchema), updateStudent);
router.delete('/:id', deleteStudent);
export default router;