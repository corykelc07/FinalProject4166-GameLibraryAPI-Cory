/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_title_key" ON "reviews"("title");
