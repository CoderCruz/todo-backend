import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { TaskCreate, TaskUpdate } from '../schemas/task';

export const tasks = Router();

function parseId(s: string) {
  const n = Number(s);
  return Number.isInteger(n) && n > 0 ? n : null;
}

tasks.get('/', async (_req, res) => {
  return res.json(await prisma.task.findMany({ orderBy: { createdAt: 'desc' } }));
});

tasks.get('/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid id' });

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  return res.json(task);
});

tasks.post('/', async (req, res) => {
  try {
    const data = TaskCreate.parse(req.body);
    const task = await prisma.task.create({ data });
    return res.status(201).json(task);
  } catch (e) {
    console.error('Error creating task', e);
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

tasks.put('/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ error: 'Invalid id' });

    const data = TaskUpdate.parse(req.body);
    const task = await prisma.task.update({ where: { id }, data });
    return res.json(task);
  } catch (e) {
    console.error('Error updating task', e);
    return res.status(500).json({ error: 'Failed to update task' });
  }
});

tasks.delete('/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ error: 'Invalid id' });

    await prisma.task.delete({ where: { id } });
    return res.status(204).end();
  } catch (e) {
    console.error('Error deleting task', e);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
});

