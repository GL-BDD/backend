-- Fetch all artisans
SELECT * FROM artisans;

--- Insert a new artisan
INSERT INTO artisans (name, specialization, contact_info, portfolio, certifications, insurance_details)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id;



