import express from 'express';
import healthRouter from './routes/health';
import apiRouter from './routes/api';

const app = express();

app.use(express.json());
app.use('/health', healthRouter);
app.use('/api', apiRouter);

export default app;
