-- Update page slugs to match Footer component expectations
UPDATE "pages" SET slug = 'privacy' WHERE id = 'privacy-policy';
UPDATE "pages" SET slug = 'terms' WHERE id = 'terms-of-service';
UPDATE "pages" SET slug = 'about' WHERE id = 'about-us';

-- Delete old pages with incorrect slugs if they still exist
DELETE FROM "pages" WHERE slug IN ('privacy-policy', 'terms-of-service', 'about-us') AND id NOT IN ('privacy', 'terms', 'about');
