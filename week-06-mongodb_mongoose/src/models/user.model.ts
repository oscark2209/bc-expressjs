import { model, Schema, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  refreshTokenHash?: string;
  _id: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    refreshTokenHash: { type: String, select: false },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);