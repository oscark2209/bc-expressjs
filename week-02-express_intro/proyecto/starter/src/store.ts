import type { Student, CreateStudentDto, UpdateStudentDto } from './types.js';

class StudentStore {
  private students: Student[] = [
    { id: 1, fullName: 'Carlos Gómez', email: 'carlos@music.com', instrumentId: 1, teacherId: 1, active: true },
    { id: 2, fullName: 'María Rodríguez', email: 'maria@music.com', instrumentId: 2, teacherId: 2, active: true },
    { id: 3, fullName: 'Andrés López', email: 'andres@music.com', instrumentId: 3, teacherId: 1, active: false }
  ];
  private nextId = 4;

  getAll(): Student[] {
    return this.students;
  }

  getById(id: number): Student | undefined {
    return this.students.find((student) => student.id === id);
  }

  create(data: CreateStudentDto): Student {
    const newStudent: Student = { id: this.nextId++, ...data };
    this.students.push(newStudent);
    return newStudent;
  }

  update(id: number, data: UpdateStudentDto): Student | undefined {
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) return undefined;

    const updatedStudent: Student = { ...this.students[index], ...data, id };
    this.students[index] = updatedStudent;
    return updatedStudent;
  }

  remove(id: number): boolean {
    const initialLength = this.students.length;
    this.students = this.students.filter((student) => student.id !== id);
    return this.students.length < initialLength;
  }
}

export const store = new StudentStore();