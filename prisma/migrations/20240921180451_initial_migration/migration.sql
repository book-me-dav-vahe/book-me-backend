BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] INT NOT NULL IDENTITY(1,1),
    [role] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [profilePicture] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [user_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[providers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [locationId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [providers_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    CONSTRAINT [providers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[locations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [address] NVARCHAR(1000) NOT NULL,
    [lat] INT,
    [lng] INT,
    [alt] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [locations_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [locations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[categories] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000),
    [order] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [categories_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [categories_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[services] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000),
    [order] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [services_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [categoryId] INT NOT NULL,
    [parentId] INT,
    CONSTRAINT [services_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[providerServices] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000),
    [order] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [providerServices_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [serviceId] INT,
    [providerId] INT NOT NULL,
    CONSTRAINT [providerServices_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[providers] ADD CONSTRAINT [providers_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[locations]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[providers] ADD CONSTRAINT [providers_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[services] ADD CONSTRAINT [services_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[categories]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[services] ADD CONSTRAINT [services_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[services]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[providerServices] ADD CONSTRAINT [providerServices_serviceId_fkey] FOREIGN KEY ([serviceId]) REFERENCES [dbo].[services]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[providerServices] ADD CONSTRAINT [providerServices_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[providers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
