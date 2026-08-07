import express from 'express';
import db from './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
