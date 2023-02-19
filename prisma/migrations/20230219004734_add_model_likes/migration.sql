-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "iliked" BOOLEAN DEFAULT false,
    "postId" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
