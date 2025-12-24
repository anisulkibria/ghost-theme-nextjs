-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "noIndex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoImage" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT;

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "noIndex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ogType" TEXT NOT NULL DEFAULT 'website',
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoImage" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "noIndex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ogType" TEXT NOT NULL DEFAULT 'article',
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoImage" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT;

-- AlterTable
ALTER TABLE "themes" ADD COLUMN     "noIndex" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ogType" TEXT NOT NULL DEFAULT 'product',
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoImage" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT;
