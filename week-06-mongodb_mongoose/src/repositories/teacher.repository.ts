import { TeacherModel, ITeacher } from '../models/teacher.model';

export class TeacherRepository {
  async findAll() { return TeacherModel.find().populate('instruments').sort({ createdAt: -1 }); }

  async findById(id: string): Promise<ITeacher | null> {
    return TeacherModel.findById(id).populate('instruments');
  }

  async create(data: Partial<ITeacher>) {
    const teacher = new TeacherModel(data);
    return teacher.save();
  }

  async update(id: string, data: Partial<ITeacher>) {
    return TeacherModel.findByIdAndUpdate(id, data, { 
      new: true, 
      runValidators: true 
    });
  }
  async delete(id: string): Promise<ITeacher | null> {
    return TeacherModel.findByIdAndDelete(id);
  }
}