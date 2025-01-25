-- Fetch all artisans 0
SELECT * FROM artisans;

----- create a new artisan 1
INSERT INTO artisans (username,email,password,phone_number,specialization,description) VALUES ($1, $2, $3,$4,$5,$6) RETURNING id, username;

----- Update artisan name 2
UPDATE artisans
SET username = $1
WHERE id = $2
RETURNING *;

----- Update artisan email 3
UPDATE artisans
SET email = $1
WHERE id = $2
RETURNING *;

----- Update artisan phone number 4
UPDATE artisans
SET phone_number = $1
WHERE id = $2
RETURNING *;

----- Update artisan specialization 5
UPDATE artisans
SET specialization = $1
WHERE id = $2
RETURNING *;

----- Update artisan description 6
UPDATE artisans
SET description = $1
WHERE id = $2
RETURNING *;

----- Delete an artisan 7
DELETE FROM artisans
WHERE id = $1
RETURNING id;

----- Fetch an artisan by id 8
SELECT * FROM artisans WHERE id = $1;

----- Fetch all artisans with the same specialization 9
SELECT * FROM artisans WHERE specialization = $1;