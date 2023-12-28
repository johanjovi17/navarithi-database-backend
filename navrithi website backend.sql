CREATE TABLE member (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number NUMERIC,
    department VARCHAR(255),
    position VARCHAR(255),
	isAdmin BOOLEAN
);

SELECT * FROM member

DELETE FROM member