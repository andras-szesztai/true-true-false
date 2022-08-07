-- CreateEnum
CREATE TYPE "RoundStage" AS ENUM ('IDLE', 'QUESTIONING', 'QUESS_REVEAL', 'SCORING');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roundStage" "RoundStage" NOT NULL DEFAULT 'IDLE',
ALTER COLUMN "selectedPlayerId" DROP NOT NULL;
