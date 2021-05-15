-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "giveId" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);
