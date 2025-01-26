-- get all projects 0
SELECT * FROM portfolio_projects;

----- create a project 1
insert into portfolio_projects(description , date , price , location,  artisan_id ) values ($1, $2, $3, $4, $5) returning *;

----- add an attachment 2
insert into portfolio_project_images (attachment,encoding,mime_type,project_id) values ($1,$2,$3,$4) returning *;

----- get attachments for a project 3
select * from portfolio_project_images where project_id= $1;

----- get projects by artisan id 4
SELECT 
  portfolio_projects.*,
  COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'image_id', portfolio_project_images.image_id,
        'attachment', portfolio_project_images.attachment,
        'mime_type', portfolio_project_images.mime_type
      )
    ) FILTER (WHERE portfolio_project_images.image_id IS NOT NULL), '[]'
  ) AS attachments
FROM portfolio_projects
LEFT JOIN portfolio_project_images ON portfolio_projects.portfolio_project_id = portfolio_project_images.project_id
WHERE portfolio_projects.artisan_id = $1
GROUP BY portfolio_projects.portfolio_project_id;

----- delete a project 5
delete from portfolio_projects where portfolio_project_id = $1 and artisan_id = $2 returning portfolio_project_id;