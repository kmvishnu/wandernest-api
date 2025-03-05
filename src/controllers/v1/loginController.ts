import { NextFunction, Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, verifyUser } from "../../components/v1/userComponent";
import { AppError, HttpStatusCode } from "../../types/errors";
import {
  LoginRequestSchema,
  VerifyRegisterSchema,
} from "../../types/request.types";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = LoginRequestSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await verifyUser(email);
    if (!user) {
      throw new AppError(
        HttpStatusCode.UNAUTHORIZED,
        "auth_error",
        "Invalid email or password"
      );
    }

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      throw new AppError(
        HttpStatusCode.UNAUTHORIZED,
        "auth_error",
        "Invalid email or password"
      );
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER,
        "config_error",
        "JWT secret key not configured"
      );
    }

    const data = {
      time: Date(),
      name: user.name,
      id: user.id,
      email:user.email,
      exp:
        Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN || "3600"),
    };

    const token = jwt.sign(data, jwtSecretKey);
    

    res.status(HttpStatusCode.OK).json({
      status: "success",
      token,
      user: {id: user.id, name: user.name, email: user.email},
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const validatedData = VerifyRegisterSchema.parse(req.body);
    const { email, password, name } = validatedData;

    const existingUser = await verifyUser(email);
    if (existingUser) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "error",
        message: "User already exists with this email",
      });
    }

    const result = await createUser(name, email, password);
    if (result) {
      return res.status(HttpStatusCode.OK).json({
        status: "otpSuccess",
        message: "User Created",
      });
    }

    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "user_creation_failed",
      "Failed to create user"
    );
  } catch (error) {
    next(error);
  }
};


