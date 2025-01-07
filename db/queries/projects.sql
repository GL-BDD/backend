-- get all projects 0
SELECT * FROM projects;

----- create a project 1
insert into projects (artisan_id, client_id, description, date, price,location) values ($1, $2, $3, $4, $5,$6) returning id;

----- add an attachment 2
insert into project_images (project_id,attachment) values ($1,$2) returning id;

----- get attachments for a project 3
select * from project_images where project_id = $1;

----- get projects by artisan id 4
select * from projects where artisan_id = $1;

----- delete a project 5
delete from projects where id = $1 and artisan_id = $2 returning id;