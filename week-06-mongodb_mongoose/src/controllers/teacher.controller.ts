import { Request, Response, NextFunction } from 'express';
import { TeacherService } from '../services/teacher.service';

export class TeacherController {
  private teacherService = new TeacherService();

  getTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teachers = await this.teacherService.getAllTeachers();
      res.status(200).json({ status: 'success', data: teachers });
    } catch (error) {
      next(error);
    }
  };

getTeacherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Nos aseguramos de que el id sea estrictamente un string
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      
      const teacher = await this.teacherService.getTeacherById(id);
      res.status(200).json({ status: 'success', data: teacher });
    } catch (error) {
      next(error);
    }
  };
  createTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId; // Inyectado por el authMiddleware
      const newTeacher = await this.teacherService.createTeacher(req.body, userId!);
      res.status(201).json({ status: 'success', data: newTeacher });
    } catch (error) {
      next(error);
    }
  };

 updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      
      const updated = await this.teacherService.updateTeacher(id, req.body);
      res.status(200).json({ status: 'success', data: updated });
    } catch (error) {
      next(error);
    }
  };

  deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await this.teacherService.deleteTeacher(id);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  };
}