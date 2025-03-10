import multer from "multer";
import cloudinary from "../../config/cloudinaryConfig";
import { Request, Response, NextFunction } from "express";
import { createHotel, updateHotel, removeHotel, getHotels } from "../../components/v1/hotelComponent";
import { AddHotelSchema, EditHotelSchema } from "../../types/request.types";

const upload = multer({ storage: multer.memoryStorage() });

export const addHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.array("images", 10)(req, res, async (err) => {
    if (err) return res.status(400).json({ error: "Image upload failed" });

    try {
      const parsedBody = {
        ...req.body,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        totalRooms: Number(req.body.totalRooms),
        availableRooms: Number(req.body.availableRooms),
        amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
        policies: req.body.policies ? JSON.parse(req.body.policies) : [],
        reviews: req.body.reviews ? JSON.parse(req.body.reviews) : [],
      };

      const validatedData = AddHotelSchema.parse(parsedBody);

      const {
        name,
        description,
        location,
        price,
        contact,
        rating,
        totalRooms,
        availableRooms,
        amenities,
        policies,
        reviews,
      } = validatedData;

      let imageUrls: string[] = [];
      if (req.files && req.files.length > 0) {
        const uploadPromises = (req.files as any).map(file => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "hotels" },
              (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(file.buffer);
          });
        });

        const results = await Promise.all(uploadPromises);
        imageUrls = results.map(result => (result as any).secure_url);
      }

      const hotel = await createHotel({
        name,
        description,
        location,
        price,
        contact,
        rating,
        totalRooms,
        availableRooms,
        imageUrls,
        amenities,
        policies,
        reviews,
      });

      res.status(201).json({ status: "success", hotel });
    } catch (error) {
      next(error);
    }
  });
};

export const editHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.array("images", 10)(req, res, async (err) => {
    if (err) return res.status(400).json({ error: "Image upload failed" });

    try {
      const parsedBody = {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : undefined,
        description: req.body.description || undefined,
        location: req.body.location || undefined,
        rating: req.body.rating ? Number(req.body.rating) : undefined,
        totalRooms: req.body.totalRooms ? Number(req.body.totalRooms) : undefined,
        availableRooms: req.body.availableRooms ? Number(req.body.availableRooms) : undefined,
        amenities: req.body.amenities ? JSON.parse(req.body.amenities) : undefined,
        policies: req.body.policies ? JSON.parse(req.body.policies) : undefined,
        reviews: req.body.reviews ? JSON.parse(req.body.reviews) : undefined,
        id: req.body.id || undefined,
      };

      const validatedData = EditHotelSchema.partial().parse(parsedBody);

      const updateData: any = {};
      for (const key in validatedData) {
        if (validatedData[key] !== undefined) {
          updateData[key] = validatedData[key];
        }
      }

      let imageUrls: string[] = [];
      if (req.files && req.files.length > 0) {
        const uploadPromises = (req.files as any).map(file => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "hotels" },
              (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(file.buffer);
          });
        });

        const results = await Promise.all(uploadPromises);
        imageUrls = results.map(result => (result as any).secure_url);
        updateData.imageUrls = imageUrls;
      }

      const { id } = validatedData;

      const updatedHotel = await updateHotel(id, updateData);

      res.status(200).json({ status: "success", hotel: updatedHotel });
    } catch (error) {
      next(error);
    }
  });
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    await removeHotel(id as string);

    res.status(200).json({ status: "success", message: "Hotel deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const criteria = req.body;

    const hotels = await getHotels(criteria);

    res.status(200).json({ status: "success", hotels });
  } catch (error) {
    next(error);
  }
};