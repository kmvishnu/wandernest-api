import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});



export const VerifyRegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    // .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    // .regex(/[a-z]/, "Password must include at least one lowercase letter")
    // .regex(/\d/, "Password must include at least one number")
    // .regex(/[@$!%*?&#]/, "Password must include at least one special character"),
    ,
  name: z.string().min(3, "Name must be at least 3 characters long"),
});




export type LoginRequest = z.infer<typeof LoginRequestSchema>;
