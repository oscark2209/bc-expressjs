import type { Student } from '../types.js';
import type { CreateStudentDto, UpdateStudentDto } from '../schemas/student.schema.js';

class StudentsRepository {
  private students: Student[] = [
    { id: 1, fullName: 'Carlos Gómez', email: 'carlos@music.com', instrumentId: 1, teacherId: 1, active: true, createdAt: new Date().toISOString() },
    { id: 2, fullName: 'Maria Rodriguez', email: 'maria@music.com', instrumentId: 2, teacherId: 2, active: true, createdAt: new Date().toISOString() }
  ];

  // ✅ Debe llamarse `findAll` y ser pública (por defecto)
  async findAll(): Promise<Student[]> {
    return structuredClone(this.students);
  }

  async findById(id: number): Promise<Student | null> {
    const student = this.students.find((s) => s.id === id);
    return student ? structuredClone(student) : null;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const newStudent: Student = {
      id: this.students.length + 1,
      ...dto,
      createdAt: new Date().toISOString()
    };
    this.students.push(newStudent);
    return structuredClone(newStudent);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student | null> {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const currentStudent = this.students[index]!;
    const updatedStudent: Student = {
      id: currentStudent.id,
      fullName: dto.fullName ?? currentStudent.fullName,
      email: dto.email ?? currentStudent.email,
      instrumentId: dto.instrumentId ?? currentStudent.instrumentId,
      teacherId: dto.teacherId ?? currentStudent.teacherId,
      active: dto.active ?? currentStudent.active,
      createdAt: currentStudent.createdAt
    };

    this.students[index] = updatedStudent;
    return structuredClone(updatedStudent);
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.students.length;
    this.students = this.students.filter((s) => s.id !== id);
    return this.students.length < initialLength;
  }
}

export const studentsRepository = new StudentsRepository();

