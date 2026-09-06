export interface Student {
  id: number;
  fullName: string;
  email: string;
  instrumentId: number;
  teacherId: number;
  active: boolean;
  createdAt: string;
}

export interface Instrument {
  id: number;
  name: string;
  family: string;
  available: boolean;
  createdAt: string;
}

export interface Teacher {
  id: number;
  fullName: string;
  specialty: string;
  active: boolean;
  createdAt: string;
}

export interface Lesson {
  id: number;
  studentId: number;
  teacherId: number;
  instrumentId: number;
  schedule: string;
  createdAt: string;
}

export type CreateStudentDto = Omit<Student, 'id' | 'createdAt'>;
export type UpdateStudentDto = Partial<CreateStudentDto>;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}