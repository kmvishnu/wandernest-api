import { Router } from "express";
import { login, register } from "../controllers/v1/loginController";


const V1Routes = Router();

V1Routes.post("/login", login);
V1Routes.post("/register", register);
export default V1Routes;
