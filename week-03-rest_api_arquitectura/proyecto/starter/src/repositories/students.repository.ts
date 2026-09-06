import type { Student, CreateStudentDto, UpdateStudentDto } from '../types.js';

class StudentsRepository {
  private students: Student[] = [
    { id: 1, fullName: 'Carlos Santana', email: 'carlos@music.com', instrumentId: 1, teacherId: 1, active: true, createdAt: new Date().toISOString() },
    { id: 2, fullName: 'Adele Adkins', email: 'adele@music.com', instrumentId: 2, teacherId: 2, active: true, createdAt: new Date().toISOString() },
    { id: 3, fullName: 'Jimi Hendrix', email: 'jimi@music.com', instrumentId: 3, teacherId: 1, active: false, createdAt: new Date().toISOString() }
  ];
  private nextId = 4;

  async findAll(): Promise<Student[]> {
    return structuredClone(this.students);
  }

  async findById(id: number): Promise<Student | undefined> {
    const student = this.students.find((s) => s.id === id);
    return student ? structuredClone(student) : undefined;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const newStudent: Student = {
      id: this.nextId++,
      ...dto,
      createdAt: new Date().toISOString()
    };
    this.students.push(newStudent);
    return structuredClone(newStudent);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student | undefined> {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    this.students[index] = {
      ...this.students[index],
      ...dto
    };
    return structuredClone(this.students[index]);
  }

  async remove(id: number): Promise<boolean> {
    const initialLength = this.students.length;
    this.students = this.students.filter((s) => s.id !== id);
    return this.students.length < initialLength;
  }
}

export const studentsRepository = new StudentsRepository();