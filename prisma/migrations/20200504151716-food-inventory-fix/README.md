# Migration `20200504151716-food-inventory-fix`

This migration has been generated by Dylan DE SOUSA at 5/4/2020, 3:17:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."FoodInventory.userId_foodId"

CREATE UNIQUE INDEX "FoodInventory.userId_foodId" ON "public"."FoodInventory"("userId","foodId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200427170653-food-inventory..20200504151716-food-inventory-fix
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
@@ -24,9 +24,10 @@
   svgName  String
 }
 model FoodInventory {
-  userId   String @id
+  id       Int    @id @default(autoincrement())
+  userId   String
   foodId   String
-  @@unique([foodId, userId])
+  @@unique([userId, foodId])
 }
```

