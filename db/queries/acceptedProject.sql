-- get accepted projects0
SELECT *
FROM accepted_projects;

----- create an accepted project 1
INSERT INTO accepted_projects (accepted_price,  proposal_id, artisan_id) VALUES ($1, $2, $3, ) returning accepted_id; 



----- update proposal status 2
UPDATE project_proposals 
SET accepted_status = 'accepte' 
WHERE proposal_id = $1
RETURNING proposal_id;