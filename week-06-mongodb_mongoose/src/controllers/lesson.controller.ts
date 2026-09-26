import { NextFunction, Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';

export const lessonController = {
  async getAll(_req: Request, res: Response, next: NextFunction) { try { res.status(200).json({ status: 'success', data: await lessonService.getAll() }); } catch (error) { next(error); } },
  async getById(req: Request, res: Response, next: NextFunction) { try { res.status(200).json({ status: 'success', data: await lessonService.getById(req.params.id as string) }); } catch (error) { next(error); } },
  async create(req: Request, res: Response, next: NextFunction) { try { res.status(201).json({ status: 'success', data: await lessonService.create(req.body, req.user!.userId) }); } catch (error) { next(error); } },
  async update(req: Request, res: Response, next: NextFunction) { try { res.status(200).json({ status: 'success', data: await lessonService.update(req.params.id as string, req.body) }); } catch (error) { next(error); } },
  async delete(req: Request, res: Response, next: NextFunction) { try { await lessonService.delete(req.params.id as string); res.status(204).send(); } catch (error) { next(error); } },
};