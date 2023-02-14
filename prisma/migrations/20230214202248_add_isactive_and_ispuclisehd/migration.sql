-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "IsActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "IsPublished" BOOLEAN NOT NULL DEFAULT false;
