import morgan from 'morgan';
import type { StreamOptions } from 'morgan';
import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

const formats = isProduction
  ? winston.format.combine(winston.format.timestamp(), winston.format.json())
  : winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
    );

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: isProduction ? 'warn' : 'http'
  })
];

if (isProduction) {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  );
}

export const logger = winston.createLogger({
  level: isProduction ? 'warn' : 'http',
  format: formats,
  transports
});

const stream: StreamOptions = {
  write: (message: string) => logger.http(message.trim())
};

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);