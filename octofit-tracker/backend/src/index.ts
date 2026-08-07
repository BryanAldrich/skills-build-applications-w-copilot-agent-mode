import app from './app';
import db from './config/database';

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});

export { db };
