import { Request, Response, NextFunction } from "express";
import { AddBookingSchema } from "../../types/request.types";
import { HttpStatusCode } from "../../types/errors";
import { bookHotelComponent, getBookingsComponent } from "../../components/v1/bookingComponent";

export const bookHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = AddBookingSchema.parse(req.body);
    const user = req.user; // Access the user property directly
    const { hotelId, checkIn, checkOut, members } = validatedData;
    const booking = await bookHotelComponent(
      hotelId,
      checkIn,
      checkOut,
      members,
      user.id
    );
    res.status(HttpStatusCode.OK).json({
      status: "success",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user; 
    const bookings = await getBookingsComponent(user.id); 
    res.status(HttpStatusCode.OK).json({
      status: "success",
      bookings,
    });
  } catch (error) {
    next(error);
  }
};