-- fetch all certifications 0
SELECT * FROM certifications;

----- create a new certification 1
INSERT INTO certifications (certification_name, issue_date , attachment,mime_type, artisan_id ) VALUES ($1, $2,$3,$4,$5) RETURNING *,TO_CHAR(issue_date:: DATE, 'dd/MM/yyyy') issue_date;


----- delete a certification 2
DELETE FROM certifications
WHERE certification_id = $1 and artisan_id = $2

----- Fetch all certifications for one artisan 3
SELECT *,TO_CHAR(issue_date:: DATE, 'dd/MM/yyyy') issue_date
FROM certifications WHERE artisan_id = $1;