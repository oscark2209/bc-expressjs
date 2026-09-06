import { studentsRepository } from '../repositories/students.repository.js';
import { AppError } from '../errors/AppError.js';
import type { Student, PaginatedResponse } from '../types.js';
import type { CreateStudentDto, UpdateStudentDto } from '../schemas/student.schema.js';

class StudentsService {
  async getAll(pageParam?: string, limitParam?: string): Promise<PaginatedResponse<Student>> {
    const page = Math.max(1, Number(pageParam) || 1);
    const limit = Math.max(1, Number(limitParam) || 10);

    const allStudents = await studentsRepository.findAll();
    const total = allStudents.length;

    const startIndex = (page - 1) * limit;
    const data = allStudents.slice(startIndex, startIndex + limit);

    return { data, total, page, limit };
  }

  async getById(id: number): Promise<Student> {
    const student = await studentsRepository.findById(id);
    if (!student) {
      throw new AppError(404, `Student with id ${id} not found`);
    }
    return student;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    return await studentsRepository.create(dto);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    await this.getById(id); // Lanza AppError 404 si no existe antes de actualizar
    const updated = await studentsRepository.update(id, dto);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.getById(id); // Lanza AppError 404 si no existe antes de eliminar
    await studentsRepository.delete(id);
  }
}

export const studentsService = new StudentsService();