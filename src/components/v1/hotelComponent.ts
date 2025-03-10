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
  const hotelService = new HotelService();

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

export const updateHotel = async (
  id: string,
  hotelData: Partial<{
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
  }>
): Promise<boolean> => {
  const hotelService = new HotelService();

  try {
    const hotel = await hotelService.updateHotel(id, hotelData);
    return true;
  } catch (error) {
    console.error("Error updating hotel:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to update hotel"
    );
  }
};

export const getHotels = async (criteria: {
  id?: string;
  name?: string;
  location?: string;
}): Promise<any> => {
  const hotelService = new HotelService();

  try {
    if (criteria.id) {
      return await hotelService.getHotelById(criteria.id);
    } else if (criteria.name && criteria.location) {
      return await hotelService.getHotelByNameAndLocation(criteria.name, criteria.location);
    } else if (criteria.name) {
      return await hotelService.getHotelByName(criteria.name);
    } else if (criteria.location) {
      return await hotelService.getHotelByLocation(criteria.location);
    } else {
      return await hotelService.getAllHotels();
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to fetch hotels"
    );
  }
};

export const removeHotel = async (id: string): Promise<boolean> => {
  const hotelService = new HotelService();

  try {
    const hotel = await hotelService.removeHotel(id);
    return true;
  } catch (error) {
    console.error("Error removing hotel:", error);
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER,
      "database_error",
      "Failed to remove hotel"
    );
  }
};