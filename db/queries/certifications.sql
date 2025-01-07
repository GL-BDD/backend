-- fetch all certifications 0
SELECT * FROM certifications;

----- create a new certification 1
INSERT INTO certifications (artisan_id, attachment) VALUES ($1, $2) RETURNING id, artisan_id;


----- delete a certification 2
DELETE FROM certifications
WHERE id = $1 and artisan_id = $2

----- Fetch all certifications for one artisan 3
SELECT * FROM certifications WHERE artisan_id = $1;