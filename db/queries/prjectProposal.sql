-- fetch all project Proposals 0
SELECT * FROM projectProposals;


----- create a new project Proposal connected to an artisan 1
INSERT INTO
projectProposals (client_id, artisan_id, description, status)
VALUES ($1, $2, $3, $4) RETURNING *;

----- create a new project proposal public to all artisans 2
INSERT INTO ProjectProposals (client_id, specialization, description, status)
VALUES ($1, $2, $3, $4) RETURNING *;

----- delete a project proposal 3
DELETE FROM projectProposals
WHERE id = $1
RETURNING * ;