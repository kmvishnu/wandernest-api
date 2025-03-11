import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void  => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Forbidden: Invalid or expired token" });
    return;

  }
};