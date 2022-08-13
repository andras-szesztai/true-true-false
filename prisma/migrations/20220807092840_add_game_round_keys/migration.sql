/*
  Warnings:

  - Added the required column `selectedAnswer` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundStage` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedPlayerId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoundStage" AS ENUM ('QUESTIONING', 'QUESS_REVEAL', 'SCORING');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "selectedAnswer" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roundStage" "RoundStage" NOT NULL,
ADD COLUMN     "selectedPlayerId" TEXT NOT NULL;
