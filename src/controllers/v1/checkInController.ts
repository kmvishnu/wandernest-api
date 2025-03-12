import { Request, NextFunction, Response } from "express";
import { AddCheckInSchema } from "../../types/request.types";
import { HttpStatusCode } from "../../types/errors";
import { cancelCheckInComponent, checkInComponent, getCheckInsComponent } from "../../components/v1/checkInComponent";

export const addCheckIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = AddCheckInSchema.parse(req.body);
    const user = req.user;
    const { bookingId, members } = validatedData;
    const checkIn = await checkInComponent(bookingId, members);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      checkIn,
    });
  } catch (error) {
    next(error);
  }
};

export const getCheckIns = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.query;
    const checkIns = await getCheckInsComponent(id as string);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      checkIns,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelCheckIn = async (
  req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.query;
    const checkIn = await cancelCheckInComponent(id as string);
    res.status(HttpStatusCode.OK).json({
      status: "success",
      checkIn,
    });
  } catch (error) {
    next(error);
  }
}


