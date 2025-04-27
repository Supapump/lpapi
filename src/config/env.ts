import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Environment variables validation
const EnvSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ALLOWED_ORIGINS: z.string().optional()
});

// Validate environment variables
const envResult = EnvSchema.safeParse(process.env);
if (!envResult.success) {
  console.error('Invalid environment variables:', envResult.error.format());
  process.exit(1);
}

export const env = envResult.data;