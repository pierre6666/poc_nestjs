/*
  Warnings:

  - Added the required column `test2` to the `Tweets2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tweets2" ADD COLUMN     "test2" TEXT NOT NULL;
