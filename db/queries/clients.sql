-- Fetch all artisans 0
SELECT * FROM clients;

----- fetch client by client_id 1
select * from clients where client_id = $1;

----- Insert a new artisan 2
-- INSERT INTO artisans (name, specialization, contact_info, portfolio, certifications, insurance_details)
-- VALUES ($1, $2, $3, $4, $5, $6)
-- RETURNING client_id;

----- update a client username 3 
update clients 
set username = $1
where client_id = $2
RETURNING *;

----- update a client email 4
update clients
set email = $1
where client_id = $2
RETURNING *;

----- delete a client 5
delete from clients
where client_id = $1
RETURNING client_id;

----- create a client 6
INSERT INTO clients (username,email,phone_number, password) VALUES ($1, $2, $3,$4) RETURNING client_id, username;

