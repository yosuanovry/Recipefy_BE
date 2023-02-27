-- Active: 1677133475241@@127.0.0.1@5432@recipes@public
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


CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    photo VARCHAR,
    verif INT DEFAULT 0,
    OTP VARCHAR,
    created_at TIMESTAMP
);

ALTER TABLE users add role VARCHAR;

SELECT * FROM users;

INSERT INTO users(id,email,password,fullname) VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','ean@ean.id','123','ean');

ALTER TABLE recipes add users_id VARCHAR;

ALTER TABLE recipes add Foreign Key (users_id) REFERENCES users(id);

SELECT recipes.id,recipes.title,recipes.ingredients,recipes.photo,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE users_id='c14a2a48-a49d-4e2a-b480-0b74fa74bbac'


