import prisma from "../db";

export class CheckInService {
  async checkIn(
    bookingId: string,
    members: { name: string; age: number; aadhar?: string }[]
  ) {
    // First, create the CheckIn record
    const checkIn = await prisma.checkIn.create({
      data: {
        bookingId,
      },
    });

    // Then, create the Member records with the checkInId
    const memberRecords = await prisma.member.createMany({
      data: members.map((member) => ({
        name: member.name,
        age: member.age,
        aadhar: member.aadhar || null,
        checkInId: checkIn.id, // Use the ID of the created CheckIn record
      })),
    });

    // Update the isCheckedIn column in the Booking table to true
    await prisma.booking.update({
      where: { id: bookingId },
      data: { isCheckedIn: true },
    });

    // Fetch the complete CheckIn record with related members
    const completeCheckIn = await prisma.checkIn.findUnique({
      where: { id: checkIn.id },
      include: {
        members: true,
      },
    });

    return completeCheckIn;
  }

  async getCheckIns(bookingId: string) {
    const checkIns = await prisma.checkIn.findMany({
      where: { bookingId },
      include: {
        members: true,
      },
    });
    return checkIns;
  }

  async deleteCheckIn(checkInId: string) {
    // Get the bookingId before deleting the check-in
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId },
      select: { bookingId: true },
    });

    if (!checkIn) {
      throw new Error("Check-in not found");
    }

    // Delete the CheckIn record
    const deletedCheckIn = await prisma.checkIn.delete({
      where: { id: checkInId },
      include: {
        members: true,
      },
    });

    // Update the isCheckedIn column in the Booking table to false
    await prisma.booking.update({
      where: { id: checkIn.bookingId },
      data: { isCheckedIn: false },
    });

    return deletedCheckIn;
  }
}
