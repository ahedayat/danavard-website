import { z } from 'zod';

export const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, 'Phone number must start with 09 and contain 11 digits.'),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'OTP must be exactly 6 digits.'),
});
