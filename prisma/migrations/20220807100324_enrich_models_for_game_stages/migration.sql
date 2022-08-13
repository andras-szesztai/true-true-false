/*
  Warnings:

  - You are about to drop the column `roundStage` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roundStage",
ALTER COLUMN "stage" SET DEFAULT 'LOBBY';

-- DropEnum
DROP TYPE "RoundStage";
