-- fetch all project Proposals 0
SELECT * FROM project_proposals
left join project_proposal_images on project_proposals.id = project_proposal_images.project_id
;


----- create a new project Proposal connected to an artisan 1
INSERT INTO
project_proposals (client_id, artisan_id, description, status)
VALUES ($1, $2, $3, $4) RETURNING *;

----- create a new project proposal public to all artisans 2
INSERT INTO project_proposals (client_id, specialization, description, status)
VALUES ($1, $2, $3, $4) RETURNING *;

----- delete a project proposal 3
DELETE FROM project_proposals
WHERE id = $1
RETURNING * ;

----- get projects by specialization 4
SELECT * FROM project_proposals
left join project_proposal_images on project_proposals.id = project_proposal_images.project_id
WHERE specialization = $1

----- get projects by artisan id 5
SELECT * FROM project_proposals 
left join project_proposal_images on project_proposals.id = project_proposal_images.project_id
WHERE artisan_id = $1

----- add an attachment 6
INSERT INTO project_proposal_images (project_id, attachment,encoding)
VALUES ($1, $2, $3)
RETURNING id;

----- get attachments for a project 7
select * from project_proposal_images where project_id = $1;