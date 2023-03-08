CREATE TABLE users(
    id character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    fullname character varying,
    photo character varying,
    verif integer DEFAULT 0,
    otp character varying,
    created_at timestamp without time zone,
    role character varying,
    PRIMARY KEY(id)
);

-- register -> activated email
CREATE TABLE category(
    id SERIAL NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY(id)
);
INSERT INTO category(name) VALUES('main course');

CREATE TABLE recipes(
    id SERIAL NOT NULL,
    title character varying NOT NULL,
    ingredients text NOT NULL,
    photo character varying,
    created_at timestamp without time zone NOT NULL,
    category_id integer,
    slug character varying,
    deleted_at timestamp without time zone,
    users_id character varying,
    PRIMARY KEY(id),
    CONSTRAINT recipes_category_id_fkey FOREIGN key(category_id) REFERENCES category(id),${snap}CONSTRAINT recipes_users_id_fkey FOREIGN key(users_id) REFERENCES users(id)
);


ALTER TABLE recipes add category_id INT;
ALTER TABLE recipes add Foreign Key (users_id) REFERENCES users(id);

ALTER TABLE recipes add deleted_at

SELECT * FROM category;

SELECT * FROM users;

SELECT * FROM recipes;

2023-02-16 14:38:47.211

https://res.cloudinary.com/dzvtizxtq/image/upload/v1677402947/food/pyb1zadib6rantuayw1u.jpg