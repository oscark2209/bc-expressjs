import { Types } from 'mongoose';
import { AppError } from '../errors/appError';
import type { ILesson } from '../models/lesson.model';
import { InstrumentModel } from '../models/instrument.model';
import { StudentModel } from '../models/student.model';
import { TeacherModel } from '../models/teacher.model';
import { lessonRepository } from '../repositories/lesson.repository';
import type { CreateLessonDto, UpdateLessonDto } from '../schemas/lesson.schema';

async function assertReferences(data: Partial<CreateLessonDto>): Promise<void> {
  const checks: Promise<unknown>[] = [];
  if (data.student) checks.push(StudentModel.exists({ _id: data.student }));
  if (data.teacher) checks.push(TeacherModel.exists({ _id: data.teacher }));
  if (data.instrument) checks.push(InstrumentModel.exists({ _id: data.instrument }));
  if ((await Promise.all(checks)).some((result) => result === null)) {
    throw new AppError('Estudiante, profesor o instrumento no encontrado', 404);
  }
}

function objectIds(data: Partial<CreateLessonDto>): Partial<ILesson> {
  const { student, teacher, instrument, ...fields } = data;
  return {
    ...fields,
    ...(student ? { student: new Types.ObjectId(student) } : {}),
    ...(teacher ? { teacher: new Types.ObjectId(teacher) } : {}),
    ...(instrument ? { instrument: new Types.ObjectId(instrument) } : {}),
  };
}

export const lessonService = {
  getAll: () => lessonRepository.findAll(),
  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de lección inválido', 400);
    const lesson = await lessonRepository.findById(id);
    if (!lesson) throw new AppError('Lección no encontrada', 404);
    return lesson;
  },
  async create(data: CreateLessonDto, userId: string) {
    await assertReferences(data);
    return lessonRepository.create({ ...objectIds(data), addedBy: new Types.ObjectId(userId) });
  },
  async update(id: string, data: UpdateLessonDto) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de lección inválido', 400);
    await assertReferences(data);
    const lesson = await lessonRepository.updateById(id, objectIds(data));
    if (!lesson) throw new AppError('Lección no encontrada', 404);
    return lesson;
  },
  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de lección inválido', 400);
    if (!(await lessonRepository.deleteById(id))) throw new AppError('Lección no encontrada', 404);
  },
};