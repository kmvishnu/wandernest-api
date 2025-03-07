import { Router } from "express";
import { login, register } from "../controllers/v1/loginController";
import { authenticateUser } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";
import { addHotel } from "../controllers/v1/hotelController";


const V1Routes = Router();

V1Routes.post("/login", login);
V1Routes.post("/register", register);

V1Routes.get("/getHotels", register);
V1Routes.post("/addHotel", [authenticateUser, isAdmin], addHotel);
V1Routes.put("/updateHotel", register);
V1Routes.delete("/deleteHotel", register);


export default V1Routes;
