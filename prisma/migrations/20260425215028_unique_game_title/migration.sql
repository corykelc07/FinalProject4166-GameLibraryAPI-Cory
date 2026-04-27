/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "reviews_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "games_title_key" ON "games"("title");
