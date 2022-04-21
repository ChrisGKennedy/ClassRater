CREATE DATABASE cosb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--code so that uuid can be used
--run code after you connect to the database

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    password varchar NOT NULL,
    banned boolean NOT NULL
);
--uuid will be used for authentication stuff
--any uuid currently in the code will be used only after authentication is implemented

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

COPY courses(code, course_name, description) FROM '' DELIMITER ',' CSV HEADER;
--code to copy data from csv file of the cosb data once you download the csv file from the shared drive
--make sure you insert the file path to the csv file between the single quotes after FROM

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
