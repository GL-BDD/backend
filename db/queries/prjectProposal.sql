-- fetch all project Proposals 0
SELECT * FROM project_proposals
left join project_proposal_images on project_proposals.id = project_proposal_images.project_id
left join clients on clients.id = project_proposals.client_id
;


----- create a new project Proposal connected to an artisan 1
INSERT INTO
project_proposals ( description, start_date, end_date, artisan_id, client_id )
VALUES ($1, $2, $3, $4, $5) RETURNING *;

----- create a new project proposal public to all artisans 2
INSERT INTO
project_proposals ( description, start_date, end_date, specialization, client_id )
VALUES ($1, $2, $3, $4, $5) RETURNING *;

----- delete a project proposal 3
DELETE FROM project_proposals
WHERE proposal_id = $1
RETURNING proposal_id ;

----- get projects by specialization 4
SELECT 
  clients.client_id,
  clients.username AS client_username,
  project_proposals.*,
  COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'image_id', project_proposal_images.image_id,
        'attachment', project_proposal_images.attachment,
        'mime_type', project_proposal_images.mime_type
      )
    ) FILTER (WHERE project_proposal_images.image_id IS NOT NULL), '[]'
  ) AS attachments
FROM project_proposals
LEFT JOIN clients ON clients.client_id = project_proposals.client_id
LEFT JOIN project_proposal_images ON project_proposals.proposal_id = project_proposal_images.project_id
WHERE project_proposals.specialization = $1
GROUP BY 
  project_proposals.proposal_id,
  clients.client_id;

----- get projects by artisan id 5
SELECT clients.client_id ,clients.username client_username,project_proposals.*
FROM project_proposals 
left join clients on clients.client_id = project_proposals.client_id
WHERE artisan_id = $1

----- add an attachment 6
INSERT INTO project_proposal_images (attachment,encoding,mime_type,project_id)
VALUES ($1, $2, $3,$4)
RETURNING *;

----- get attachments for a project 7
select * from project_proposal_images where project_id = $1;

----- get proposal by id 8
SELECT 
clients.client_id,
clients.username client_username,
project_proposals.*,
COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'image_id', project_proposal_images.image_id,
        'attachment', project_proposal_images.attachment,
        'mime_type', project_proposal_images.mime_type
      )
    ) FILTER (WHERE project_proposal_images.image_id IS NOT NULL), '[]'
  ) AS attachments
FROM project_proposals 
left join clients on clients.client_id = project_proposals.client_id
LEFT JOIN project_proposal_images ON project_proposals.proposal_id = project_proposal_images.project_id
WHERE project_proposals.proposal_id = $1
GROUP BY 
  project_proposals.proposal_id,
  clients.client_id;

----- update a project proposal's status 9
UPDATE project_proposals
SET accepted_status = $1
WHERE proposal_id = $2
returning accepted_status; 

----- get project proposal by id 10
SELECT artisan_id FROM project_proposals WHERE proposal_id = $1;