import { HotelService } from "../../services/hotels.service";
import { AppError, HttpStatusCode } from "../../types/errors";

export const createHotel = async (hotelData: {
  name: string;
  description: string;
  location: string;
  price: number;
  contact: string;
  rating: number;
  totalRooms: number;
  availableRooms: number;
  imageUrls: string[];
  amenities: string[];
  policies: string[];
  reviews: string[];
}): Promise<boolean> => {
    const hotelService = new HotelService()
  
  try {
    const hotel = await hotelService.createHotel(hotelData);
    return true;
  } catch (error) {
    console.error("Error creating hotel:", error);
     throw new AppError(
          HttpStatusCode.INTERNAL_SERVER,
          "database_error",
          "Failed to create hotel"
        );
  }
};
