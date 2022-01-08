-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('TRANSFER', 'CHEQUE');

-- AlterTable
ALTER TABLE "Give" ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT E'TRANSFER';
