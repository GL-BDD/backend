-- Fetch all artisans 0
SELECT * FROM artisans;

----- create a new artisan 1
INSERT INTO artisans (username,email,phoneNumber, password) VALUES ($1, $2, $3,$4) RETURNING id, username;




