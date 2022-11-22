-- CreateTable
CREATE TABLE "Tweets2" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "test" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tweets2_pkey" PRIMARY KEY ("id")
);
