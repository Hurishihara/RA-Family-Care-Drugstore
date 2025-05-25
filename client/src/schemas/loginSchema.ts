import { z } from 'zod';

const loginSchema = z.object({
    username: z.string().min(2, { message: 'Username must be at least 3 characters long' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
})

export { loginSchema };
/* This code defines a Zod schema for validating a login form. The schema requires the username 
to be at least 2 characters long and the password to be at least 6 characters long. It also exports the 
schema for use in other parts of the application. */