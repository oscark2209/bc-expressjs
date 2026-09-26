import { StudentModel, IStudent } from '../models/student.model';

export const studentRepository = {
  findAll: () => StudentModel.find().populate('instruments').sort({ createdAt: -1 }),
  findById: (id: string) => StudentModel.findById(id).populate('instruments'),
  create: (data: Partial<IStudent>) => StudentModel.create(data),
  updateById: (id: string, data: Partial<IStudent>) => StudentModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id: string) => StudentModel.findByIdAndDelete(id),
};