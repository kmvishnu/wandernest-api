import exp from "constants";
import { BookingService } from "../../services/booking.service";
import { AppError, HttpStatusCode } from "../../types/errors";

export const bookHotelComponent = async (
  hotelId: string,
    checkIn: string,
    checkOut: string,
    members: any[],
    userId: number
): Promise<any> => {
  const bookingService = new BookingService();

  try {
    const booking = await bookingService.bookHotel(hotelId,userId, checkIn, checkOut, members);
    return booking;
  } catch (error) {
    console.error("Error booking hotel:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to book hotel"
    );
  }
}

export const getBookingsComponent = async (userId: number): Promise<any> => {
  const bookingService = new BookingService();

  try {
    const bookings = await bookingService.getBookings(userId);
    return bookings;
  } catch (error) {
    console.error("Error getting bookings:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to get bookings"
    );
  }
}