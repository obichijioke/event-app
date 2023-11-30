/*
  Warnings:

  - Added the required column `description` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('SINGLE_TICKET', 'GROUP_TICKET');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "limitPerUser" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TicketType" NOT NULL,
ALTER COLUMN "availability" DROP NOT NULL;
