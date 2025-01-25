-- get all projects 0
SELECT * FROM portfolio_projects;

----- create a project 1
insert into portfolio_projects(description , date , price , location,  artisan_id ) values ($1, $2, $3, $4, $5) returning portfolio_project_id;

----- add an attachment 2
insert into project_images (portfolio_project_id,attachment) values ($1,$2) returning portfolio_project_id;

----- get attachments for a project 3
select * from project_images where portfolio_project_id= $1;

----- get projects by artisan id 4
select * from portfolio_projects where artisan_id = $1;

----- delete a project 5
delete from portfolio_projects where portfolio_project_id = $1 and artisan_id = $2 returning portfolio_project_id;