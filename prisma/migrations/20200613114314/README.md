# Migration `20200613114314`

This migration has been generated by Leonardo Silvio de Moura at 6/13/2020, 11:43:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."user" (
"apelido" text  NOT NULL ,"email" text  NOT NULL ,"id" text  NOT NULL ,"nome" text  NOT NULL ,"senha" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "user.email" ON "public"."user"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200613114314
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,21 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id      String @default(uuid()) @id
+  email   String @unique
+  senha   String
+  nome    String
+  apelido String
+
+  @@map(name: "user")
+}
```


