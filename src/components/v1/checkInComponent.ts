import { CheckInService } from "../../services/checkIn.service";
import { AppError, HttpStatusCode } from "../../types/errors";

export const checkInComponent = async (
  bookingId: string,
  members: any[]
): Promise<any> => {
  const checkInService = new CheckInService();

  try {
    const checkIn = await checkInService.checkIn(bookingId, members);
    return checkIn;
  } catch (error) {
    console.error("Error checking in:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to check in"
    );
  }
};

export const getCheckInsComponent = async (bookingId: string): Promise<any> => {
  const checkInService = new CheckInService();

  try {
    const checkIns = await checkInService.getCheckIns(bookingId);
    return checkIns;
  } catch (error) {
    console.error("Error getting check ins:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to get check ins"
    );
  }
};

export const cancelCheckInComponent = async (
  checkInId: string
): Promise<any> => {
  const checkInService = new CheckInService();

  try {
    const checkIn = await checkInService.deleteCheckIn(checkInId);
    return checkIn;
  } catch (error) {
    console.error("Error canceling check in:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to cancel check in"
    );
  }
};
