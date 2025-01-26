-- create quote 0
insert into quotes (price, unit, artisan_id, proposal_id) values ($1, $2, $3, $4) returning *;

----- get quotes by proposal id
select * from quotes where proposal_id = $1

----- delete a quote 2
delete from quotes where artisan_id = $1 and quote_id = $2 returning quote_id;