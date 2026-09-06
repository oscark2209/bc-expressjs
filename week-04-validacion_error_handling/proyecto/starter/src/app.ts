import express, { type Express } from 'express';
import { morganMiddleware } from './config/logger.js';
import { studentsRouter } from './routes/students.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app: Express = express();

app.use(express.json());
app.use(morganMiddleware);

app.use('/api/v1/students', studentsRouter);

app.use(notFound);
app.use(errorHandler);