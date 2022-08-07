/*
  Warnings:

  - You are about to drop the column `done` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `selectedAnswer` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "done",
DROP COLUMN "selectedAnswer",
ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLastRound" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "selectedAnswerId" INTEGER;
