-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image" BYTEA;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "zipcode" INTEGER;
