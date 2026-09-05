// Entidades de la Escuela de Música
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
  monthlyFee: number;
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

export interface SchoolData {
  students: Student[];
  instruments: Instrument[];
  teachers: Teacher[];
  lessons: Lesson[];
}

export interface Summary {
  totalInstruments: number;
  activeCount: number;
  inactiveCount: number;
  averageFee: number;
  mostExpensive: Instrument | null;
  cheapest: Instrument | null;
}

export interface Report {
  generatedAt: string;
  filterCategory: string | null;
  summary: Summary;
  instruments: Instrument[];
}