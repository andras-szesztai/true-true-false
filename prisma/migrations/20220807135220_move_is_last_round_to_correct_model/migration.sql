/*
  Warnings:

  - You are about to drop the column `isLastRound` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "isLastRound";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "isLastRound" BOOLEAN NOT NULL DEFAULT false;
