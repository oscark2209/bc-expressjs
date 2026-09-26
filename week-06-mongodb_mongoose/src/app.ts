import express from 'express';
import cookieParser from 'cookie-parser';
import instrumentRouter from './routes/secondary.routes';
import teacherRouter from './routes/teacher.routes';
import studentRouter from './routes/student.routes';
import lessonRouter from './routes/lesson.routes';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Rutas de Autenticación (Registro, Login, Refresh, Logout, Me)
app.use('/api/v1/auth', authRouter);

// Rutas del Dominio (Escuela de Música)
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/instruments', instrumentRouter);
app.use('/api/v1/lessons', lessonRouter);
app.use('/api/v1/teachers', teacherRouter);

app.use(notFound);
app.use(errorHandler);