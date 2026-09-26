import { Types } from 'mongoose';
import { AppError } from '../errors/appError';
import { studentRepository } from '../repositories/student.repository';
import type { IStudent } from '../models/student.model';
import type { CreateStudentDto, UpdateStudentDto } from '../schemas/student.schema';

export const studentService = {
  getAll: () => studentRepository.findAll(),
  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de estudiante inválido', 400);
    const student = await studentRepository.findById(id);
    if (!student) throw new AppError('Estudiante no encontrado', 404);
    return student;
  },
  create(data: CreateStudentDto, userId: string) {
    return studentRepository.create({ ...data, instruments: data.instruments.map((item) => new Types.ObjectId(item)), addedBy: new Types.ObjectId(userId) });
  },
  async update(id: string, data: UpdateStudentDto) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de estudiante inválido', 400);
    const { instruments, ...fields } = data;
    const updateData: Partial<IStudent> = {
      ...fields,
      ...(instruments ? { instruments: instruments.map((item) => new Types.ObjectId(item)) } : {}),
    };
    const updated = await studentRepository.updateById(id, updateData);
    if (!updated) throw new AppError('Estudiante no encontrado', 404);
    return updated;
  },
  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de estudiante inválido', 400);
    if (!(await studentRepository.deleteById(id))) throw new AppError('Estudiante no encontrado', 404);
  },
};