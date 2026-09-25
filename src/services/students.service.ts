import { StudentsRepository } from '../repositories/students.repository';
import { CreateStudentDto, UpdateStudentDto } from '../schemas/student.schema';

export class StudentsService {
  private repository = new StudentsRepository();

  async getStudents(page: number, limit: number) {
    return this.repository.findAll(page, limit);
  }

  async getStudentById(id: string) {
    return this.repository.findById(id);
  }

async createStudent(data: CreateStudentDto) {
    // Forzamos el tipado para evitar que TypeScript rechace el null o undefined
    const studentData: any = {
      ...data,
      instrumentId: data.instrumentId ?? null,
    };
    return this.repository.create(studentData);
  }
  async updateStudent(id: string, data: UpdateStudentDto) {
    // Sanitizamos los datos para evitar conflictos con tipos nulos o indefinidos en Prisma
    const updateData: any = { ...data };
    
    if (updateData.instrumentId === undefined) {
      delete updateData.instrumentId;
    } else if (updateData.instrumentId === null) {
      updateData.instrumentId = null;
    }

    return this.repository.update(id, updateData);
  }

  async deleteStudent(id: string) {
    return this.repository.remove(id);
  }
}