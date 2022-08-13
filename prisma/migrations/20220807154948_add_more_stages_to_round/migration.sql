/*
  Warnings:

  - The values [QUESTIONING,QUESS_REVEAL] on the enum `RoundStage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoundStage_new" AS ENUM ('IDLE', 'QUESTION', 'QUESTION_END', 'GUESS_REVEAL', 'FALSE_REVEAL', 'SCORE_REVEAL', 'SCORING');
ALTER TABLE "Room" ALTER COLUMN "roundStage" DROP DEFAULT;
ALTER TABLE "Room" ALTER COLUMN "roundStage" TYPE "RoundStage_new" USING ("roundStage"::text::"RoundStage_new");
ALTER TYPE "RoundStage" RENAME TO "RoundStage_old";
ALTER TYPE "RoundStage_new" RENAME TO "RoundStage";
DROP TYPE "RoundStage_old";
ALTER TABLE "Room" ALTER COLUMN "roundStage" SET DEFAULT 'IDLE';
COMMIT;
