/*
  Warnings:

  - Added the required column `isActive` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RoomStage" AS ENUM ('LOBBY', 'PREPARATION', 'GAME', 'END');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "stage" "RoomStage" NOT NULL;
