-- CreateTable
CREATE TABLE "SoldItem" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "receiptId" INTEGER NOT NULL,

    CONSTRAINT "SoldItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "receiptId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_receiptId_key" ON "Receipt"("receiptId");

-- AddForeignKey
ALTER TABLE "SoldItem" ADD CONSTRAINT "SoldItem_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldItem" ADD CONSTRAINT "SoldItem_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldItem" ADD CONSTRAINT "SoldItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
