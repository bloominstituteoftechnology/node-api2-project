## knex
- can work with a development environment
- a production environment
- it can work with many dbs
- knex runs sql under the hood
- allows JS to communicate with databases (wasn't able to previously)


## SQL
SELECT customername Name
from customers
where country like "_exi%"
order by postalcode desc
limit 3
/*
select
	customerid,customername,city,postalcode,country
from customers
where country like "_exi%"
order by postalcode desc
limit 3 offset 1
*/

Index.js
- Bring in server
- run server with server.listen

Server:
- bring in express
Initialize
Teach it to use json
bring in the models

req.params
req.body
req.query

Express is a library that has the router functionality
have to import express
then can import router