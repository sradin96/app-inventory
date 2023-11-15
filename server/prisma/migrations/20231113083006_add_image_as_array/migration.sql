/*
  Warnings:

  - The `image` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "image",
ADD COLUMN     "image" BYTEA[];

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "image",
ADD COLUMN     "image" BYTEA[];
