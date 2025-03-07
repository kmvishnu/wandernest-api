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
export const AddHotelSchema = z.object({
  name: z.string().min(3, "Hotel name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  price: z.number().positive("Price must be a positive number"),
  contact: z.string().regex(/^\+?\d{10,15}$/, "Invalid contact number"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  totalRooms: z.number().int().positive("Total rooms must be a positive integer"),
  availableRooms: z.number().int().nonnegative("Available rooms must be a non-negative integer"),
  amenities: z.array(z.string()).optional(),
  policies: z.array(z.string()).optional(),
  reviews: z.array(z.string()).optional(),
});



export type LoginRequest = z.infer<typeof LoginRequestSchema>;
