import process from 'node:process';
import cors from 'cors';
import express from 'express';
import { logger } from './utils/logger';
import { errorHandler, handle404Error } from './utils/errors';
import routes from './routes/routes';
import './utils/env';

const { PORT, NODE_ENV, FRONTEND_URL } = process.env;

const app = express();

app.use(express.json());

// Configure CORS for development
app.use(
  cors({
    origin: NODE_ENV === 'development' ? 'http://localhost:4200' : FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(logger);

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the server!',
  });
});

app.get('/health-check', (_req, res) => {
  res.json({
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use('/api', routes);

app.all('*', handle404Error);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
