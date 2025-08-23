import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { tasks } from './routes/tasks';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use('/tasks', tasks);

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err?.issues) return res.status(400).json({ error: 'Invalid request', details: err.issues });
  console.error(err); res.status(500).json({ error: 'Server error' });
});

app.listen(Number(process.env.PORT || 4000), () => console.log('app listening on PORT:4000'));
