/*
  Warnings:

  - Changed the type of `state` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskState" AS ENUM ('Completada', 'Pendiente');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "state",
ADD COLUMN     "state" "TaskState" NOT NULL;
