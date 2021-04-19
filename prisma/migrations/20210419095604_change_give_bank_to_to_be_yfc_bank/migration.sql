-- DropForeignKey
ALTER TABLE "Give" DROP CONSTRAINT "Give_transferToBankId_fkey";

-- AddForeignKey
ALTER TABLE "Give" ADD FOREIGN KEY ("transferToBankId") REFERENCES "YFCBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
