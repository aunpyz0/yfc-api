/*
  Warnings:

  - You are about to drop the column `roleId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_roleId_fkey";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "roleId";

-- DropTable
DROP TABLE "Role";
