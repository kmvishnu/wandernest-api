/*
  Warnings:

  - Added the required column `hotelName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hotelName" TEXT NOT NULL,
ADD COLUMN     "isCheckedIn" BOOLEAN NOT NULL DEFAULT false;
