/*
  Warnings:

  - You are about to drop the column `typeId` on the `Give` table. All the data in the column will be lost.
  - Added the required column `paymentTypeId` to the `Give` table without a default value. This is not possible if the table is not empty.
  - Added the required column `giveTypeId` to the `Give` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Give" DROP CONSTRAINT "Give_typeId_fkey";

-- AlterTable
ALTER TABLE "Give" DROP COLUMN "typeId",
ADD COLUMN     "paymentTypeId" INTEGER NOT NULL,
ADD COLUMN     "giveTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("giveTypeId") REFERENCES "GiveType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
