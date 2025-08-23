import { z } from 'zod';
import { $Enums } from '@prisma/client';

export const TaskColorSchema = z.nativeEnum($Enums.Color);

export const TaskCreate = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  color: TaskColorSchema,
  completed: z.boolean().optional(),
});

export const TaskUpdate = z.object({
  title: z.string().trim().min(1).optional(),
  color: TaskColorSchema.optional(),
  completed: z.boolean().optional(),
})
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'At least one field must be provided',
  });

