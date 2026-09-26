import { LessonModel, ILesson } from '../models/lesson.model';

const populated = (query: ReturnType<typeof LessonModel.findById>) => query.populate('student teacher instrument');

export const lessonRepository = {
  findAll: () => LessonModel.find().populate('student teacher instrument').sort({ scheduledAt: 1 }),
  findById: (id: string) => populated(LessonModel.findById(id)),
  create: async (data: Partial<ILesson>) => (await LessonModel.create(data)).populate('student teacher instrument'),
  updateById: (id: string, data: Partial<ILesson>) => LessonModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('student teacher instrument'),
  deleteById: (id: string) => LessonModel.findByIdAndDelete(id),
};