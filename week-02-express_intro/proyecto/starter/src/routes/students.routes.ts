import { Router, type Request, type Response } from 'express';
import { store } from '../store.js';
import type { CreateStudentDto, UpdateStudentDto } from '../types.js';

export const studentsRouter: Router = Router();

// GET /api/v1/students - Obtener todos los estudiantes
studentsRouter.get('/', (_req: Request, res: Response) => {
  const students = store.getAll();
  res.status(200).json(students);
});

// GET /api/v1/students/:id - Obtener estudiante por ID
studentsRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Bad Request', message: 'ID invalido' });
    return;
  }

  const student = store.getById(id);
  if (!student) {
    res.status(404).json({ error: 'Not Found', message: `Estudiante con ID ${id} no encontrado` });
    return;
  }

  res.status(200).json(student);
});

// POST /api/v1/students - Crear estudiante
studentsRouter.post('/', (req: Request, res: Response) => {
  const { fullName, email, instrumentId, teacherId, active } = req.body as CreateStudentDto;

  if (!fullName || !email || instrumentId === undefined || teacherId === undefined) {
    res.status(400).json({ error: 'Bad Request', message: 'Faltan campos obligatorios' });
    return;
  }

  const newStudent = store.create({
    fullName,
    email,
    instrumentId,
    teacherId,
    active: active ?? true
  });

  res.status(201).json(newStudent);
});

// PUT /api/v1/students/:id - Actualizar estudiante
studentsRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Bad Request', message: 'ID invalido' });
    return;
  }

  const updatedData = req.body as UpdateStudentDto;
  const updatedStudent = store.update(id, updatedData);

  if (!updatedStudent) {
    res.status(404).json({ error: 'Not Found', message: `Estudiante con ID ${id} no encontrado` });
    return;
  }

  res.status(200).json(updatedStudent);
});

// DELETE /api/v1/students/:id - Eliminar estudiante
studentsRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Bad Request', message: 'ID invalido' });
    return;
  }

  const success = store.remove(id);
  if (!success) {
    res.status(404).json({ error: 'Not Found', message: `Estudiante con ID ${id} no encontrado` });
    return;
  }

  res.status(204).send();
});