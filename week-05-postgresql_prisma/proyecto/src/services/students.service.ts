import { StudentsRepository } from '../repositories/students.repository';
import { CreateStudentDto, UpdateStudentDto } from '../schemas/students.schema';

export class StudentsService {
  private repository = new StudentsRepository();

  async getStudents(page: number, limit: number) {
    return this.repository.findAll(page, limit);
  }

  async getStudentById(id: string) {
    return this.repository.findById(id);
  }

  async createStudent(data: CreateStudentDto) {
    return this.repository.create(data);
  }

  async updateStudent(id: string, data: UpdateStudentDto) {
    return this.repository.update(id, data);
  }

  async deleteStudent(id: string) {
    return this.repository.remove(id);
  }
}