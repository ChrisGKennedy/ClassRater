CREATE DATABASE cosb;

CREATE TABLE courses (
    code varchar(9) PRIMARY KEY,
    course_name varchar,
    description varchar
);

COPY courses(code, course_name, description) FROM 'cosb_Data.csv' DELIMITER ',' CSV HEADER;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    password varchar NOT NULL,
    banned boolean NOT NULL
);

CREATE TABLE admin (
    admin_id uuid NOT NULL,
    canban boolean NOT NULL,
    candelete boolean NOT NULL,
    canaddadmin boolean NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    professor varchar,
    post_body varchar NOT NULL,
    code varchar(9) NOT NULL,
    rating integer NOT NULL,
    user_id uuid NOT NULL,
    post_type boolean NOT NULL,
    FOREIGN KEY (code) REFERENCES courses(code),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
--type for user_id will change form integer to uuid once authentication is set up.

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    post_id integer NOT NULL,
    vote boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE flags (
    flag_id SERIAL PRIMARY KEY,
    reporter_id uuid NOT NULL,
    post_id integer NOT NULL,
    FOREIGN KEY (reporter_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);
