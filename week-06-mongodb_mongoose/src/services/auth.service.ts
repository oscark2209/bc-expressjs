import bcrypt from 'bcryptjs';
import { AppError } from '../errors/appError';
import { userRepository } from '../repositories/user.repository';
import type { LoginDto, RegisterDto } from '../schemas/auth.schema';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

const rounds = 12;

function createSession(userId: string) {
  return { accessToken: signAccessToken({ userId }), refreshToken: signRefreshToken({ userId }) };
}

export const authService = {
  async register(data: RegisterDto) {
    const user = await userRepository.create({ ...data, email: data.email.toLowerCase(), password: await bcrypt.hash(data.password, rounds) });
    const tokens = createSession(user.id);
    await userRepository.setRefreshTokenHash(user.id, await bcrypt.hash(tokens.refreshToken, rounds));
    return { user: { id: user.id, name: user.name, email: user.email }, ...tokens };
  },
  async login(data: LoginDto) {
    const user = await userRepository.findByEmail(data.email.toLowerCase());
    if (!user || !(await bcrypt.compare(data.password, user.password))) throw new AppError('Correo o contraseña incorrectos', 401);
    const tokens = createSession(user.id);
    await userRepository.setRefreshTokenHash(user.id, await bcrypt.hash(tokens.refreshToken, rounds));
    return { user: { id: user.id, name: user.name, email: user.email }, ...tokens };
  },
  async refresh(token: string) {
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (error) {
      if (error instanceof AppError && error.statusCode >= 500) throw error;
      throw new AppError('Refresh token inválido o expirado', 401);
    }
    const idRecord = await userRepository.findById(payload.userId);
    if (!idRecord) throw new AppError('Refresh token revocado', 401);
    const record = await userRepository.findByEmail(idRecord.email);
    if (!record?.refreshTokenHash || !(await bcrypt.compare(token, record.refreshTokenHash))) {
      throw new AppError('Refresh token revocado', 401);
    }
    const tokens = createSession(payload.userId);
    await userRepository.setRefreshTokenHash(payload.userId, await bcrypt.hash(tokens.refreshToken, rounds));
    return { user: { id: record.id, name: record.name, email: record.email }, ...tokens };
  },
  async logout(token?: string) {
    if (!token) return;
    try {
      const payload = verifyRefreshToken(token);
      await userRepository.setRefreshTokenHash(payload.userId, null);
    } catch {
      return;
    }
  },
  async me(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('Usuario no encontrado', 404);
    return { id: user.id, name: user.name, email: user.email };
  },
};