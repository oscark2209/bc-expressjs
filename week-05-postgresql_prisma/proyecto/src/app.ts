import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import studentsRouter from './routes/students.routes';
import { notFoundHandler } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api/v1/students', studentsRouter);

// Middlewares de control de errores
app.use(notFoundHandler);
app.use(errorHandler);

export default app;