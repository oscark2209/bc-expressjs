import { model, Schema, Types } from 'mongoose';

export interface ITeacher {
  name: string;
  email: string;
  specialty: string;
  instruments: Types.ObjectId[];
  availability: string[];
  addedBy: Types.ObjectId;
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
    availability: [{ type: String, trim: true }],
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const TeacherModel = model<ITeacher>('Teacher', teacherSchema);