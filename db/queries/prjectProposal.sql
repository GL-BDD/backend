-- fetch all project Proposals 0
SELECT * FROM project_preposal;


----- create a new project Proposal connected to an artisan 1
INSERT INTO
project_preposal (client_id, artisan_id, description, status)
VALUES ($1, $2, $3, $4) RETURNING *;

----- create a new project proposal public to all artisans 2
INSERT INTO project_preposal (client_id, specialization, description, status)
VALUES ($1, $2, $3, $4) RETURNING *;

----- delete a project proposal 3
DELETE FROM project_preposal
WHERE id = $1
RETURNING * ;

----- get projects by specialization 4
SELECT * FROM project_preposal WHERE specialization = $1

----- get projects by artisan id 5
SELECT * FROM project_preposal WHERE artisan_id = $1