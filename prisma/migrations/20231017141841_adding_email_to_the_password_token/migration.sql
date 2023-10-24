/*
  Warnings:

  - Added the required column `user_email` to the `changePasswordTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `changepasswordtokens` ADD COLUMN `user_email` TEXT NOT NULL;
