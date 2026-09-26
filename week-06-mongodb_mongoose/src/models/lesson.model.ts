import { model, Schema, Types } from 'mongoose';

export interface ILesson {
  title: string;
  student: Types.ObjectId;
  teacher: Types.ObjectId;
  instrument: Types.ObjectId;
  scheduledAt: Date;
  durationMinutes: number;
  notes?: string;
  addedBy: Types.ObjectId;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true, trim: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    instrument: { type: Schema.Types.ObjectId, ref: 'Instrument', required: true },
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 15, max: 240 },
    notes: { type: String, trim: true, maxlength: 1000 },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const LessonModel = model<ILesson>('Lesson', lessonSchema);