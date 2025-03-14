import prisma from "../db";

export class BookingService {
  async bookHotel(
    hotelId: string,
    hotelName: string,
    userId: number,
    checkIn: string,
    checkOut: string,
    members: { name: string; age: number; aadhar?: string }[]
  ) {
    const booking = await prisma.booking.create({
      data: {
        hotelId,
        hotelName,
        userId,
        checkInDate: new Date(checkIn),
        checkOutDate: new Date(checkOut),
        members: members,
      },
    });

    return booking;
  }

  async cancelBooking(bookingId: string) {
    const booking = await prisma.booking.delete({
      where: { id: bookingId },
      include: {
        checkIns: {
          include: {
            members: true,
          },
        },
      },
    });

    return booking;
  }

  async getBookings(userId: number) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        hotel: true, 
      },
    });

    return bookings;
  }
}