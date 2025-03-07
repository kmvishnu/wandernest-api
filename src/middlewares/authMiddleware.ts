import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY; 

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};
