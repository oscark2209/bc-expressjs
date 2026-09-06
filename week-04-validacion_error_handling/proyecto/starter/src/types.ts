export interface Student {
  id: number;
  fullName: string;
  email: string;
  instrumentId: number;
  teacherId: number;
  active: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}