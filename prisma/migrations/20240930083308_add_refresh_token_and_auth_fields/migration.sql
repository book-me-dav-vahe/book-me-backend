/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[user] ADD [authProvider] NVARCHAR(1000) NOT NULL CONSTRAINT [user_authProvider_df] DEFAULT 'email',
[password] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
