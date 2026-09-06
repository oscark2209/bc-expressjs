import { studentsRepository } from '../repositories/students.repository.js';
import type { Student, CreateStudentDto, UpdateStudentDto, PaginatedResponse } from '../types.js';

export class StudentsService {
  async findAll(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Student>> {
    const allStudents = await studentsRepository.findAll();
    const total = allStudents.length;

    const start = (page - 1) * limit;
    const data = allStudents.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit
    };
  }

  async findById(id: number): Promise<Student | undefined> {
    return await studentsRepository.findById(id);
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    return await studentsRepository.create(dto);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student | undefined> {
    const exists = await studentsRepository.findById(id);
    if (!exists) return undefined;
    return await studentsRepository.update(id, dto);
  }

  async remove(id: number): Promise<boolean> {
    const exists = await studentsRepository.findById(id);
    if (!exists) return false;
    return await studentsRepository.remove(id);
  }
}

export const studentsService = new StudentsService();