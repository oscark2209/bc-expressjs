import jwt from 'jsonwebtoken';
import { AppError } from '../errors/appError';

export interface TokenPayload {
  userId: string;
}

function secret(name: 'JWT_ACCESS_SECRET' | 'JWT_REFRESH_SECRET'): string {
  const value = process.env[name];
  if (!value || value.length < 32) throw new AppError(`${name} debe configurarse con al menos 32 caracteres`, 500);
  return value;
}

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret('JWT_ACCESS_SECRET'), { expiresIn: '15m' });
}

export function signRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret('JWT_REFRESH_SECRET'), { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, secret('JWT_ACCESS_SECRET')) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, secret('JWT_REFRESH_SECRET')) as TokenPayload;
}