-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "bio" DROP NOT NULL;
