BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[categories] ADD [isDeleted] BIT NOT NULL CONSTRAINT [categories_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[locations] ADD [isDeleted] BIT NOT NULL CONSTRAINT [locations_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[providers] ADD [isDeleted] BIT NOT NULL CONSTRAINT [providers_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[providerServices] ADD [isDeleted] BIT NOT NULL CONSTRAINT [providerServices_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[services] ADD [isDeleted] BIT NOT NULL CONSTRAINT [services_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[subCategories] ADD [isDeleted] BIT NOT NULL CONSTRAINT [subCategories_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[user] ADD [isDeleted] BIT NOT NULL CONSTRAINT [user_isDeleted_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
