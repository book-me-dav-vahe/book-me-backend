BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[categories] ADD CONSTRAINT [categories_description_df] DEFAULT '' FOR [description];

-- AlterTable
ALTER TABLE [dbo].[providerServices] ADD CONSTRAINT [providerServices_description_df] DEFAULT '' FOR [description];

-- AlterTable
ALTER TABLE [dbo].[services] ADD CONSTRAINT [services_description_df] DEFAULT '' FOR [description];

-- AlterTable
ALTER TABLE [dbo].[subCategories] ADD CONSTRAINT [subCategories_description_df] DEFAULT '' FOR [description];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
