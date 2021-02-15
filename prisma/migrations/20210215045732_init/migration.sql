-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ACCOUNTANT');

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supporter" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiveType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Give" (
    "id" SERIAL NOT NULL,
    "supporterId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "transferDate" TIMESTAMP(3),
    "transferFromBankId" INTEGER,
    "transferToBankId" INTEGER,
    "chequeBankId" INTEGER,
    "chequeBankBranch" TEXT,
    "chequeNumber" TEXT,
    "chequeDate" TIMESTAMP(3),
    "typeId" INTEGER NOT NULL,
    "giveFrom" TIMESTAMP(3),
    "giveTo" TIMESTAMP(3),
    "departmentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("ownerId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("transferFromBankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("transferToBankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("chequeBankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("typeId") REFERENCES "GiveType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
