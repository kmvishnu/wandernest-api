import { NextFunction, Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyUser } from "../../components/v1/userComponent";
import { AppError, HttpStatusCode } from "../../types/errors";
import {
  LoginRequestSchema,
  RefreshTokenRequestSchema,
} from "../../types/request.types";
import { saveRefreshToken, verifyRefreshToken } from "../../config/redisClient";

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
    const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
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
      exp:
        Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN || "3600"),
    };

    const refreshData = {
      time: Date(),
      name: user.name,
      id: user._id,
      exp:
        Math.floor(Date.now() / 1000) +
        Number(process.env.REFRESH_TOKEN_EXPIRESIN),
    };
    const token = jwt.sign(data, jwtSecretKey);
    const refreshToken = jwt.sign(refreshData, jwtRefreshKey);
    saveRefreshToken(
      refreshToken,
      user._id,
      Number(process.env.REFRESH_TOKEN_EXPIRESIN)
    );

    res.status(HttpStatusCode.OK).json({
      status: "success",
      token,
      refreshToken,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};

