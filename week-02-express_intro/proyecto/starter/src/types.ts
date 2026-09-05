export interface Student {
  id: number;
  fullName: string;
  email: string;
  instrumentId: number;
  teacherId: number;
  active: boolean;
}

export interface Instrument {
  id: number;
  name: string;
  category: 'strings' | 'wind' | 'percussion' | 'keyboard';
  stock: number;
}

export interface Teacher {
  id: number;
  fullName: string;
  specialty: string;
  email: string;
}

export interface Lesson {
  id: number;
  studentId: number;
  teacherId: number;
  schedule: string;
  room: string;
}

export type CreateStudentDto = Omit<Student, 'id'>;
export type UpdateStudentDto = Partial<CreateStudentDto>;