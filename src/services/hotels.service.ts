import prisma from "../db";

export class HotelService {
  async createHotel(data: {
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
  }) {
    return prisma.hotel.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        price: data.price,
        contact: data.contact,
        rating: data.rating,
        totalRooms: data.totalRooms,
        availableRooms: data.availableRooms,
        imageUrls: data.imageUrls,
        amenities: data.amenities,
        policies: data.policies,
        reviews: data.reviews,
      },
    });
  }

  async updateHotel(id: string, data: Partial<{
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
  }>) {
    return prisma.hotel.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async getHotelById(id: string) {
    return prisma.hotel.findUnique({
      where: { id },
    });
  }

  async getHotelByName(name: string) {
    return prisma.hotel.findMany({
      where: { name },
    });
  }

  async getHotelByLocation(location: string) {
    return prisma.hotel.findMany({
      where: { location },
    });
  }

  async removeHotel(id: string) {
    return prisma.hotel.delete({
      where: { id },
    });
  }
}