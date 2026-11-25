-- Add optional cover image and required description
ALTER TABLE "Book"
ADD COLUMN "coverImage" TEXT,
ADD COLUMN "description" TEXT NOT NULL DEFAULT 'No description available';

-- Add genre slug with a temporary default
ALTER TABLE "Genre"
ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';

-- Populate existing genre slugs
UPDATE "Genre"
SET "slug" = LOWER(REPLACE("name", ' ', '-'));

-- Remove temporary default
ALTER TABLE "Genre"
ALTER COLUMN "slug" DROP DEFAULT;

-- Add required password with a temporary default
ALTER TABLE "User"
ADD COLUMN "password" TEXT NOT NULL DEFAULT '';

-- Remove temporary default
ALTER TABLE "User"
ALTER COLUMN "password" DROP DEFAULT;

-- Enforce unique genre slugs
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");