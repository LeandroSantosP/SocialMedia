-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_postId_fkey";

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
