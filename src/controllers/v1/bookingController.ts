import { Request, Response, NextFunction } from "express";
import { AddBookingSchema } from "../../types/request.types";
import { HttpStatusCode } from "../../types/errors";
import {
  bookHotelComponent,
  cancelBookingComponent,
  getBookingsComponent,
} from "../../components/v1/bookingComponent";

export const bookHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = AddBookingSchema.parse(req.body);
    const user = req.user;
    const { hotelId, hotelName, checkIn, checkOut, members } = validatedData;
    const booking = await bookHotelComponent(
      hotelId,
      hotelName,
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

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id } = req.query;
    const bookings = await cancelBookingComponent(id as string);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      bookings,
    });
  } catch (error) {
    next(error);
  }
};
