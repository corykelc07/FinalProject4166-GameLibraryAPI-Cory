/*
  Warnings:

  - You are about to drop the column `description` on the `games` table. All the data in the column will be lost.
  - Added the required column `genre` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "description",
ADD COLUMN     "genre" TEXT NOT NULL;
