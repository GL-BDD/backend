-- Fetch all artisans 0
SELECT * FROM artisans;

----- create a new artisan 1
INSERT INTO artisans (username,email,phone_number, password) VALUES ($1, $2, $3,$4) RETURNING artisan_id, username;

----- Update artisan name 3
UPDATE artisans
SET username = $1
WHERE artisan_id = $2
RETURNING *;

----- Update artisan name 3
UPDATE artisans
SET username = $1
WHERE artisan_id = $2
RETURNING *;

----- Update artisan specialization 4
UPDATE artisans
SET specialization = $1
WHERE artisan_id = $2
RETURNING *;

----- Update artisan contact_info 5
UPDATE artisans
SET contact_info = $1
WHERE artisan_id = $2
RETURNING *;

----- Update artisan portfolio 6
UPDATE artisans
SET portfolio = $1
WHERE artisan_id = $2
RETURNING *;

----- Update artisan certifications 7
UPDATE artisans
SET certifications = $1
WHERE artisan_id = $2
RETURNING *;

----- Update artisan insurance_details 8
UPDATE artisans
SET insurance_details = $1
WHERE artisan_id = $2
RETURNING *;

----- Delete an artisan 9
DELETE FROM artisans
WHERE artisan_id = $1
RETURNING artisan_id;

----- Fetch an artisan by artisan_id 10
SELECT * FROM artisans WHERE artisan_id = $1;

----- Fetch all artisans with the same specialization 11
SELECT * FROM artisans WHERE specialization = $1;