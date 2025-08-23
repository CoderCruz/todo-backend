import { z } from 'zod';

export const TaskCreate = z.object({
  title: z.string().min(1),
  color: z.enum(['red', 'blue', 'green']),
});

export const TaskUpdate = z.object({
  title: z.string().min(1).optional(),
  color: z.enum(['red', 'blue', 'green']).optional(),
  completed: z.boolean().optional(),
});

export type TaskCreateInput = z.infer<typeof TaskCreate>;
export type TaskUpdateInput = z.infer<typeof TaskUpdate>;
