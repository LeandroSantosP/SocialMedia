/*
  Warnings:

  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_clientId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_fkey";

-- DropTable
DROP TABLE "likes";

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "iliked" BOOLEAN DEFAULT false,
    "postId" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
