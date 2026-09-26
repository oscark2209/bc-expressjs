import { TeacherRepository } from '../repositories/teacher.repository';
import { AppError } from '../errors/appError';
import { Types } from 'mongoose';
import type { CreateTeacherDto, UpdateTeacherDto } from '../schemas/teacher.schema';

export class TeacherService {
  private teacherRepo = new TeacherRepository();

  async getAllTeachers() {
    return this.teacherRepo.findAll();
  }

  async getTeacherById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de profesor inválido', 400);
    const teacher = await this.teacherRepo.findById(id);
    if (!teacher) {
      throw new AppError('Profesor no encontrado', 404);
    }
    return teacher;
  }

  async createTeacher(data: CreateTeacherDto, userId: string) {
    return this.teacherRepo.create({ ...data, instruments: data.instruments.map((id) => new Types.ObjectId(id)), addedBy: new Types.ObjectId(userId) });
  }

  async updateTeacher(id: string, data: UpdateTeacherDto) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de profesor inválido', 400);
    const { instruments, ...fields } = data;
    const updateData: Partial<import('../models/teacher.model').ITeacher> = {
      ...fields,
      ...(instruments ? { instruments: instruments.map((item) => new Types.ObjectId(item)) } : {}),
    };
    const updated = await this.teacherRepo.update(id, updateData);
    if (!updated) {
      throw new AppError('Profesor no encontrado para actualizar', 404);
    }
    return updated;
  }

  async deleteTeacher(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('ID de profesor inválido', 400);
    const deleted = await this.teacherRepo.delete(id);
    if (!deleted) {
      throw new AppError('Profesor no encontrado para eliminar', 404);
    }
    return deleted;
  }
}