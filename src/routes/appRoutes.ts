import { Router } from "express";
import { login, register } from "../controllers/v1/loginController";
import { authenticateUser } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";
import { addHotel, deleteHotel, editHotel, getHotel } from "../controllers/v1/hotelController";
import { bookHotel, cancelBooking, getBookings } from "../controllers/v1/bookingController";
import { addCheckIn, cancelCheckIn, getCheckIns } from "../controllers/v1/checkInController";
import { getCheckInsComponent } from "../components/v1/checkInComponent";

const V1Routes = Router();

V1Routes.post("/login", login);
V1Routes.post("/register", register);

V1Routes.post("/getHotels", getHotel);
V1Routes.post("/addHotel", [authenticateUser, isAdmin], addHotel);
V1Routes.put("/updateHotel", [authenticateUser, isAdmin], editHotel);
V1Routes.delete("/deleteHotel", [authenticateUser, isAdmin], deleteHotel);

V1Routes.post("/bookHotel", authenticateUser, bookHotel);
V1Routes.get("/getBookings", authenticateUser, getBookings);
V1Routes.delete("/cancelBooking", authenticateUser, cancelBooking);

V1Routes.post("/addCheckIn", authenticateUser, addCheckIn);
V1Routes.get("/getCheckIns", authenticateUser, getCheckIns);
V1Routes.delete("/cancelCheckIn", authenticateUser,cancelCheckIn );

export default V1Routes;