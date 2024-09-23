# Prisma tips
[Source for tips](https://dev.to/afl_ext/prisma-vs-typeorm-description-and-comparison-4bob)

Generate client code
`yarn prisma:generate-client` which will call `prisma generate --schema=./prisma/schema.prisma`
the generated code will be stored in [./node_modules/.prisma](./node_modules/.prisma)

Create migration
`yarn prisma:create-migration MIGRATION_NAME` which will call `prisma migrate dev --schema=./schema.prisma --create-only --name MIGRATION_NAME`

Migrate
`yarn prisma:migrate` which will call `prisma migrate dev --schema=./schema.prisma`
for prod environment where you care a lot of your data: `prisma migrate deploy --schema=./schema.prisma`
