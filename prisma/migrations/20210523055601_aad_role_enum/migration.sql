-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ACCOUNTANT');

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'STAFF';
