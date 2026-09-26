import { NextFunction, Request, Response } from 'express';
import { instrumentService } from '../services/instrument.service';

export const instrumentController = {
  async getAll(_req: Request, res: Response, next: NextFunction) { try { res.status(200).json({ status: 'success', data: await instrumentService.getAll() }); } catch (error) { next(error); } },
  async getById(req: Request, res: Response, next: NextFunction) { try { res.status(200).json({ status: 'success', data: await instrumentService.getById(req.params.id as string) }); } catch (error) { next(error); } },
  async create(req: Request, res: Response, next: NextFunction) { try { res.status(201).json({ status: 'success', data: await instrumentService.create(req.body, req.user!.userId) }); } catch (error) { next(error); } },
  async update(req: Request, res: Response, next: NextFunction) { try { res.status(200).json({ status: 'success', data: await instrumentService.update(req.params.id as string, req.body) }); } catch (error) { next(error); } },
  async delete(req: Request, res: Response, next: NextFunction) { try { await instrumentService.delete(req.params.id as string); res.status(204).send(); } catch (error) { next(error); } },
};