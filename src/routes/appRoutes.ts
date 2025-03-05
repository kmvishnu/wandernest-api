import { Router } from "express";
import { login } from "../controllers/v1/loginController";
import {
  verifyOtp,
} from "../controllers/v1/otpController";

const V1Routes = Router();

V1Routes.post("/login", login);
V1Routes.post("/register", verifyOtp);
export default V1Routes;
