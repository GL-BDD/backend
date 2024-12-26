-- create quote 0
insert into quotes (artisan_id, proposal_id, quote, description) values ($1, $2, $3, $4) returning id;

----- delete a quote 1
delete from quotes where artisan_id = $1 and id = $2 returning id;