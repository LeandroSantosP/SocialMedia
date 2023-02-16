/*
  Warnings:

  - You are about to drop the column `clientId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `comments` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_clientId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "clientId",
DROP COLUMN "likes",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
