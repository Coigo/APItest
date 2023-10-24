/*
  Warnings:

  - You are about to drop the column `user_email` on the `changepasswordtokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `changePasswordTokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `changePasswordTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `changepasswordtokens` DROP COLUMN `user_email`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `changePasswordTokens_user_id_key` ON `changePasswordTokens`(`user_id`);

-- AddForeignKey
ALTER TABLE `changePasswordTokens` ADD CONSTRAINT `changePasswordTokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
