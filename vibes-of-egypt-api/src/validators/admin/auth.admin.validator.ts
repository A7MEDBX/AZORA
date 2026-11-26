import { z } from 'zod';

export const adminLoginSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).trim().email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  })
  .strict();

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
