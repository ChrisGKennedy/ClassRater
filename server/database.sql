CREATE DATABASE dummycosb;

CREATE TABLE courses (
    code varchar(9),
    course_name varchar,
    description varchar
);

COPY courses(code, course_name, description) FROM 'C:\Users\yota0\Desktop\Codes\cosb_Data.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE descriptions (
    post_id SERIAL PRIMARY KEY,
    desc_body varchar,
    rating integer NOT NULL,
    code varchar(9)
);



CREATE DATABASE cosb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    password varchar NOT NULL,
    banned boolean NOT NULL
);

CREATE TABLE admin (
    user_id uuid NOT NULL,
    canban boolean NOT NULL,
    candelete boolean NOT NULL,
    canaddadmin boolean NOT NULL
);

CREATE TABLE courses (
    code varchar(9) PRIMARY KEY NOT NULL,
    course_name varchar NOT NULL,
    description varchar NOT NULL
);

COPY courses(code, course_name, description) FROM 'C:\Users\yota0\Desktop\Codes\cosb_Data.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    professor varchar,
    post_body varchar NOT NULL,
    code varchar(9) NOT NULL,
    rating integer NOT NULL,
    user_id integer NOT NULL,
    post_type boolean NOT NULL
);
--type for user_id will change form integer to uuid once authentication is set up.


CREATE TABLE flags (
    flag_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    post_id integer NOT NULL,
    post_type boolean NOT NULL
);

--fake user
INSERT INTO users (email, password, banned) VALUES ('test@trinity.edu', 'password', false);