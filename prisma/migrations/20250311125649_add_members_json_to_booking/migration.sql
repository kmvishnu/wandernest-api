/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Member` table. All the data in the column will be lost.
  - Added the required column `members` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_bookingId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "members" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "bookingId";
