/*
  Warnings:

  - You are about to drop the column `questionsLeft` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "questionsLeft";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "questionsLeft" INTEGER NOT NULL DEFAULT 10;
