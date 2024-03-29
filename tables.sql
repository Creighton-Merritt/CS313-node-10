-- CREATE TABLE person (
--     id SERIAL primary key,
--     first_name VARCHAR(80),
--     last_name VARCHAR(80),
--     birth_date DATE
-- );

-- INSERT INTO person(first_name, last_name, birth_date) VALUES
-- ('Merrritt', 'Creighton', '1970-08-22'),
-- ('Charles', 'Creighton', '1969-06-22'),
-- ('Rufus', 'Dalbini', '1920-10-12'),
-- ('Judy', 'Tuley', '1920-10-12'),
-- ('Ethne', 'Creighton', '2004-05-13'),
-- ('Lori', 'Creighton', '1950-12-07'),
-- ('Ruth', 'Thurman', '1920-09-09');

-- CREATE TABLE relationship (
--     parent_id INTEGER REFERENCES person(id),
--     child_id INTEGER REFERENCES person(id)
-- );

-- INSERT INTO relationship(parent_id, child_id) VALUES
-- (3, 4),
-- (7, 6),
-- (6, 2),
-- (4, 1),
-- (1, 5),
-- (2, 5);

-- SELECT DISTINCT a.first_name, b.first_name, parent_id, child_id
-- FROM person a, person b, relationship
-- WHERE parent_id = a.id
-- and child_id = b.id;

CREATE TABLE stores (
    id SERIAL primary key,
    store_name VARCHAR(100)
);

CREATE TABLE groceryItems (
    item_id SERIAL primary key,
    item_name VARCHAR(100),
    store_id INTEGER REFERENCES stores(id)
);

INSERT INTO stores (store_name) VALUES
('Smiths'),
('Costco'),
('Amazon');

INSERT INTO groceryItems (item_name, store_id) VALUES
('Peppermint pretzels', 2),
('Toilet paper', 2),
('Milk', 1),
('Bread', 1),
('Eggs', 1),
('Thermacare', 3),
('Eye cream', 3);

-- Test join/query for selected store
SELECT item_name, store_name
FROM stores
LEFT JOIN groceryItems
ON store_id = id 
WHERE store_id = 1;

-- Test join/query for all items and  store
SELECT item_name, store_name
FROM stores
LEFT JOIN groceryItems
ON store_id = id
ORDER BY store_name;

-- Test insert
INSERT INTO groceryItems (item_name, store_id) VALUES ('Cheddar Slices', 2); 

-- Delete more than one item at a time
const sql = "DELETE FROM groceryItems where item_id in($1)";