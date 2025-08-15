-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "resetToken" TEXT;
