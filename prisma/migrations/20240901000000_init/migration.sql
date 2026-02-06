-- CreateEnum
CREATE TYPE "NycPresence" AS ENUM ('NYC_OFFICE', 'NYC_HYBRID', 'NYC_REMOTE_ALLOWED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('FINTECH', 'HEALTH', 'DEVTOOLS', 'AI', 'MARKETPLACE', 'CONSUMER', 'B2B_SAAS', 'OTHER');

-- CreateEnum
CREATE TYPE "HiringStatus" AS ENUM ('ACTIVELY_INTERVIEWING', 'RECENTLY_POSTED', 'HIRING', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "careersUrl" TEXT,
    "nycPresence" "NycPresence" NOT NULL,
    "industry" "Industry" NOT NULL,
    "hiringStatus" "HiringStatus" NOT NULL,
    "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "roleLinks" JSONB NOT NULL,
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "lastVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "companyName" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "nycPresenceNotes" TEXT,
    "roleLinks" JSONB NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");
