-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "refreshToken" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Give" (
    "id" SERIAL NOT NULL,
    "supporterId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "receiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "evidence" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferDetail" (
    "id" SERIAL NOT NULL,
    "giveId" INTEGER NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL,
    "transferFromBankId" INTEGER NOT NULL,
    "transferToBankId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YFCBank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChequeDetail" (
    "id" SERIAL NOT NULL,
    "giveId" INTEGER NOT NULL,
    "chequeBankId" INTEGER NOT NULL,
    "chequeBankBranch" TEXT NOT NULL,
    "chequeNo" TEXT NOT NULL,
    "chequeDate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "giveId" INTEGER NOT NULL,
    "supporterId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "purposeId" INTEGER NOT NULL,
    "expressNo" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purpose" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "Staff.email_unique" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TransferDetail_giveId_unique" ON "TransferDetail"("giveId");

-- CreateIndex
CREATE UNIQUE INDEX "ChequeDetail_giveId_unique" ON "ChequeDetail"("giveId");

-- AddForeignKey
ALTER TABLE "Staff" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("receiverId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferDetail" ADD FOREIGN KEY ("giveId") REFERENCES "Give"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferDetail" ADD FOREIGN KEY ("transferFromBankId") REFERENCES "Bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferDetail" ADD FOREIGN KEY ("transferToBankId") REFERENCES "YFCBank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChequeDetail" ADD FOREIGN KEY ("giveId") REFERENCES "Give"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChequeDetail" ADD FOREIGN KEY ("chequeBankId") REFERENCES "Bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD FOREIGN KEY ("giveId") REFERENCES "Give"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD FOREIGN KEY ("purposeId") REFERENCES "Purpose"("id") ON DELETE CASCADE ON UPDATE CASCADE;
