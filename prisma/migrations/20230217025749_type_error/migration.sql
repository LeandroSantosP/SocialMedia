/*
  Warnings:

  - You are about to drop the column `avatar_urk` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "avatar_urk",
ADD COLUMN     "avatar_url" TEXT;
