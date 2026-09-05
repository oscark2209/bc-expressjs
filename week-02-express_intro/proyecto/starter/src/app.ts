import express, { type Express, type Request, type Response } from 'express';
import { studentsRouter } from './routes/students.routes.js';

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  // Endpoint de comprobación básica
  app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'API Escuela de Música activa 🎼' });
  });

  // Montar router de estudiantes
  app.use('/api/v1/students', studentsRouter);

  // Manejo de rutas inexistentes (404)
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found', message: 'Ruta no encontrada' });
  });

  return app;
}