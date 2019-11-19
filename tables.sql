CREATE TABLE person (
    id SERIAL primary key,
    first_name VARCHAR(80),
    last_name VARCHAR(80),
    birth_date DATE
);

INSERT INTO person(first_name, last_name, birth_date) VALUES
('Merrritt', 'Creighton', '1970-08-22'),
('Charles', 'Creighton', '1969-06-22'),
('Rufus', 'Dalbini', '1920-10-12');
