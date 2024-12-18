-- Fetch all artisans 0
SELECT * FROM artisans;

-- Fetch artisan by id 1
SELECT * FROM artisans WHERE id = $1;

-- Insert a new artisan 2
INSERT INTO artisans (name, specialization, contact_info, portfolio, certifications, insurance_details)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id;

-- Update artisan name 3
UPDATE artisans
SET name = $1
WHERE id = $2
RETURNING *;

-- Update artisan specialization 4
UPDATE artisans
SET specialization = $1
WHERE id = $2
RETURNING *;

-- Update artisan contact_info 5
UPDATE artisans
SET contact_info = $1
WHERE id = $2
RETURNING *;

-- Update artisan portfolio 6
UPDATE artisans
SET portfolio = $1
WHERE id = $2
RETURNING *;

-- Update artisan certifications 7
UPDATE artisans
SET certifications = $1
WHERE id = $2
RETURNING *;

-- Update artisan insurance_details 8
UPDATE artisans
SET insurance_details = $1
WHERE id = $2
RETURNING *;

-- Delete an artisan 9
DELETE FROM artisans
WHERE id = $1
RETURNING id;