/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Room_slug_key" ON "Room"("slug");
