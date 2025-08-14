// import { z } from 'zod';

// // For creating a user
// export const createUserSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   phone: z.string().optional(),
//   role: z.enum(['renter', 'owner', 'admin']).optional(),
// });

// // For login
// export const loginSchema = z.object({
//   email: z.string().email('Invalid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// // For changing password
// export const changePasswordSchema = z.object({
//   id: z.string(),
//   oldPassword: z.string().min(6),
//   newPassword: z.string().min(6),
// });

// export type CreateUserInput = z.infer<typeof createUserSchema>;
// export type LoginInput = z.infer<typeof loginSchema>;
// export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;








import { z } from 'zod';
import validator from 'validator';

// Create User Schema
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string()
    .refine(val => validator.isMobilePhone(val, 'en-ZW'), {
      message: 'Phone number must be a valid Zimbabwean number',
    })
    .optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password cannot exceed 15 characters')
    .refine(val => /[A-Z].*[A-Z]/.test(val), { message: 'At least 2 uppercase letters required' })
    .refine(val => /[a-z].*[a-z]/.test(val), { message: 'At least 2 lowercase letters required' })
    .refine(val => /[0-9].*[0-9]/.test(val), { message: 'At least 2 numbers required' })
    .refine(val => /[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'At least 2 special characters required' })
    .optional(), // optional if using Google login
  role: z.enum(['renter', 'owner', 'admin']).optional(),
  googleId: z.string().optional(), // for Google login
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().optional(), // optional if using Google login
  googleId: z.string().optional(), // for Google login
});

// Change Password Schema
export const changePasswordSchema = z.object({
  id: z.string(),
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password cannot exceed 15 characters')
    .refine(val => /[A-Z].*[A-Z]/.test(val), { message: 'At least 2 uppercase letters required' })
    .refine(val => /[a-z].*[a-z]/.test(val), { message: 'At least 2 lowercase letters required' })
    .refine(val => /[0-9].*[0-9]/.test(val), { message: 'At least 2 numbers required' })
    .refine(val => /[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'At least 2 special characters required' }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
