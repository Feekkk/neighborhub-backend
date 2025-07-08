-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'RESOLVED', 'CLOSED');

-- AlterTable
ALTER TABLE "ReportEmergency" ADD COLUMN     "status" "ReportStatus" NOT NULL DEFAULT 'OPEN';
