-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "contact" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "totalRooms" INTEGER NOT NULL,
    "availableRooms" INTEGER NOT NULL,
    "imageUrls" TEXT[],
    "amenities" TEXT[],
    "policies" TEXT[],
    "reviews" TEXT[],

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);
