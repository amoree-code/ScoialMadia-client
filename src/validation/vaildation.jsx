import { z } from "zod";

export const RegisterVal = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "First name must be at least 3 characters" })
    .max(15, { message: "First name must be at most 15 characters" }),

  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(15, { message: "Last name must be at most 15 characters" }),

  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(15, { message: "Username must be at most 15 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(50, { message: "Email must be at most 50 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),

  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(8, { message: "Confirm Password must be at least 8 characters" }),
});

export const LoginVal = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .min(3, { message: "Email must be at least 3 characters" })
    .max(50, { message: "Email must be at most 50 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});
