import multer from "multer";
import cloudinary from "../../config/cloudinaryConfig";
import { Request, Response, NextFunction } from "express";
import { createHotel } from "../../components/v1/hotelComponent";
import { AddHotelSchema } from "../../types/request.types";

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