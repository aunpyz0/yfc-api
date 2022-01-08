-- DropForeignKey
ALTER TABLE "ChequeDetail" DROP CONSTRAINT "ChequeDetail_chequeBankId_fkey";

-- DropForeignKey
ALTER TABLE "ChequeDetail" DROP CONSTRAINT "ChequeDetail_giveId_fkey";

-- DropForeignKey
ALTER TABLE "Give" DROP CONSTRAINT "Give_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Give" DROP CONSTRAINT "Give_supporterId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_giveId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_purposeId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_supporterId_fkey";

-- DropForeignKey
ALTER TABLE "TransferDetail" DROP CONSTRAINT "TransferDetail_giveId_fkey";

-- DropForeignKey
ALTER TABLE "TransferDetail" DROP CONSTRAINT "TransferDetail_transferFromBankId_fkey";

-- DropForeignKey
ALTER TABLE "TransferDetail" DROP CONSTRAINT "TransferDetail_transferToBankId_fkey";

-- AddForeignKey
ALTER TABLE "Give" ADD CONSTRAINT "Give_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Give" ADD CONSTRAINT "Give_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferDetail" ADD CONSTRAINT "TransferDetail_giveId_fkey" FOREIGN KEY ("giveId") REFERENCES "Give"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferDetail" ADD CONSTRAINT "TransferDetail_transferFromBankId_fkey" FOREIGN KEY ("transferFromBankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferDetail" ADD CONSTRAINT "TransferDetail_transferToBankId_fkey" FOREIGN KEY ("transferToBankId") REFERENCES "YFCBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChequeDetail" ADD CONSTRAINT "ChequeDetail_giveId_fkey" FOREIGN KEY ("giveId") REFERENCES "Give"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChequeDetail" ADD CONSTRAINT "ChequeDetail_chequeBankId_fkey" FOREIGN KEY ("chequeBankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_giveId_fkey" FOREIGN KEY ("giveId") REFERENCES "Give"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_purposeId_fkey" FOREIGN KEY ("purposeId") REFERENCES "Purpose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "ChequeDetail.giveId_unique" RENAME TO "ChequeDetail_giveId_key";

-- RenameIndex
ALTER INDEX "Staff.email_unique" RENAME TO "Staff_email_key";

-- RenameIndex
ALTER INDEX "TransferDetail.giveId_unique" RENAME TO "TransferDetail_giveId_key";
