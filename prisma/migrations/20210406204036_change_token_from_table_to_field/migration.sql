/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[email]` on the table `Staff`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_staffId_fkey";

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "token" TEXT;

-- DropTable
DROP TABLE "Token";

-- CreateIndex
CREATE UNIQUE INDEX "Staff.email_unique" ON "Staff"("email");
