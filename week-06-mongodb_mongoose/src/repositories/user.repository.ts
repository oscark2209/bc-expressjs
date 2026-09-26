import { UserModel } from '../models/user.model';

export const userRepository = {
  create: (data: { name: string; email: string; password: string }) => UserModel.create(data),
  findByEmail: (email: string) => UserModel.findOne({ email }).select('+password +refreshTokenHash'),
  findById: (id: string) => UserModel.findById(id),
  setRefreshTokenHash: (id: string, refreshTokenHash: string | null) =>
    UserModel.findByIdAndUpdate(id, { refreshTokenHash }, { new: true }).select('+refreshTokenHash'),
};