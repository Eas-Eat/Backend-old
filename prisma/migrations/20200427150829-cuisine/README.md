# Migration `20200427150829-cuisine`

This migration has been generated by MaximeG2018 at 4/27/2020, 3:08:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Cuisine" (
    "svgName" text  NOT NULL ,
    "type" text  NOT NULL ,
    PRIMARY KEY ("type")
) 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200421145830-user..20200427150829-cuisine
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,5 +14,10 @@
   id       String @id @default(uuid())
   email    String @unique
   password String
   name     String
-}
+}
+
+model Cuisine {
+  type     String @id
+  svgName  String
+}
```


