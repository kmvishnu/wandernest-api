/*
  Warnings:

  - Changed the type of `imageUrls` on the `Hotel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amenities` on the `Hotel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `policies` on the `Hotel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reviews` on the `Hotel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "imageUrls",
ADD COLUMN     "imageUrls" JSONB NOT NULL,
DROP COLUMN "amenities",
ADD COLUMN     "amenities" JSONB NOT NULL,
DROP COLUMN "policies",
ADD COLUMN     "policies" JSONB NOT NULL,
DROP COLUMN "reviews",
ADD COLUMN     "reviews" JSONB NOT NULL;
