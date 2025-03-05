import bcrypt from "bcryptjs";
import User from "../../models/User";
import { UserService } from '../../users.service'
import { AppError, HttpStatusCode } from "../../types/errors";

export const verifyUser = async (email: string) => {
  try {
     const userService = new UserService()
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return null; 
    }

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to fetch user"
    );
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<boolean> => {

  const userService = new UserService()
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

