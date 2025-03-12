import prisma from "../db";

export class CheckInService {
  async checkIn(bookingId: string, members: { name: string; age: number; aadhar?: string }[]) {
    // First, create the CheckIn record
    const checkIn = await prisma.checkIn.create({
      data: {
        bookingId
      }
    });

    // Then, create the Member records with the checkInId
    const memberRecords = await prisma.member.createMany({
      data: members.map(member => ({
        name: member.name,
        age: member.age,
        aadhar: member.aadhar || null,
        checkInId: checkIn.id // Use the ID of the created CheckIn record
      }))
    });

    // Fetch the complete CheckIn record with related members
    const completeCheckIn = await prisma.checkIn.findUnique({
      where: { id: checkIn.id },
      include: {
        members: true
      }
    });

    return completeCheckIn;
  }

  async getCheckIns(bookingId: string) {
    const checkIns = await prisma.checkIn.findMany({
      where: { bookingId },
      include: {
        members: true
      }
    });
    return checkIns;
  }

  async deleteCheckIn(checkInId: string) {
    const checkIn = await prisma.checkIn.delete({
      where: { id: checkInId },
      include: {
        members: true
      }
    });
    return checkIn;
  }
}