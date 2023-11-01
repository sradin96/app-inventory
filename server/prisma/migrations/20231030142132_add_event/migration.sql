/*
  Warnings:

  - Added the required column `brand` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "brand" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemEvent" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "itemEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itemEvent" ADD CONSTRAINT "itemEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemEvent" ADD CONSTRAINT "itemEvent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
