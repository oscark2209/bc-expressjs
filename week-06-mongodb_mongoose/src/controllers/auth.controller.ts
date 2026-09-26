import { CookieOptions, NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

function setTokens(res: Response, tokens: { accessToken: string; refreshToken: string }): void {
  res.cookie('accessToken', tokens.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', tokens.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

function clearTokens(res: Response): void {
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
}

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      setTokens(res, result);
      res.status(201).json({ status: 'success', data: { user: result.user } });
    } catch (error) { next(error); }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      setTokens(res, result);
      res.status(200).json({ status: 'success', data: { user: result.user } });
    } catch (error) { next(error); }
  },
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken as string | undefined;
      if (!token) { clearTokens(res); res.status(401).json({ status: 'error', message: 'Refresh token no encontrado' }); return; }
      const result = await authService.refresh(token);
      setTokens(res, result);
      res.status(200).json({ status: 'success', data: { user: result.user } });
    } catch (error) { next(error); }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.cookies?.refreshToken as string | undefined);
      clearTokens(res);
      res.status(204).send();
    } catch (error) { next(error); }
  },
  async me(req: Request, res: Response, next: NextFunction) {
    try { res.status(200).json({ status: 'success', data: { user: await authService.me(req.user!.userId) } }); } catch (error) { next(error); }
  },
};