/*
  Warnings:

  - You are about to drop the column `create_at` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
