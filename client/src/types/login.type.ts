import type { loginSchema } from '@/schemas/login.schema';
import { z } from 'zod';

type loginFormType = z.infer<typeof loginSchema>;

export type { loginFormType };
// This code defines a TypeScript type `loginFormType` that is inferred from a Zod schema called `loginSchema`.