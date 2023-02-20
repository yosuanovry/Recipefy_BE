-- Active: 1676604818335@@127.0.0.1@5432@recipes@public
CREATE TABLE users(id SERIAL, name VARCHAR);

INSERT INTO users(name) VALUES('yosua');

 SELECT * FROM users;

 UPDATE users SET name='fauzan' WHERE name='basri';

 DELETE FROM users WHERE name= "revo";

 SELECT * FROM users
 
 CREATE TABLE users(
    id SERIAL, 
    name VARCHAR
    );
ALTER TABLE users add PRIMARY KEY(id);

CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    ingredients TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    users_id INT REFERENCES users(id)
);

 SELECT * FROM recipes;
 SELECT * FROM recipes WHERE deleted_at IS NULL;

INSERT INTO recipes(ingredients,title,photo,users_id,created_at) VALUES('nasi + garam','nasi goreng','http://localhost',4,'2023-02-14 14:58:23');
INSERT INTO recipes(ingredients,title,photo,users_id,created_at) VALUES('telur','telur goreng','http://localhost',4,'to_timestamp(${Date.now()} / 1000.0)');

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO category(name) VALUES('main course');

SELECT * FROM recipes;

ALTER TABLE recipes add category_id INT;

ALTER TABLE recipes add Foreign Key (category_id) REFERENCES category(id);

ALTER TABLE recipes add slug VARCHAR;


DELETE FROM recipes WHERE id=14;

SELECT * FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id; 

ALTER TABLE recipes add deleted_at TIMESTAMP DEFAULT NULL;