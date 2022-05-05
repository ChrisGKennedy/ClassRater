-- code to run in postgres to create our database and other related code
-- all code can be copy and pasted to create the database
    -- with the exception of the code to copy data from a csv fiel to the courses table
    -- the COPY code must be completed with a file path to the csv file
    -- csv file holding relavent data to the courses table will be provided in the repository named "cosb_Data.csv"

CREATE DATABASE cosb;
-- run first

CREATE TABLE courses (
    code varchar(9) PRIMARY KEY,
    course_name varchar,
    description varchar
);

COPY courses(code, course_name, description) FROM '' DELIMITER ',' CSV HEADER;
-- copies csv data 
-- enter the file path to the file "cosb_Data.csv" between the single quotes after the FROM
    -- make sure the file name is included in the path as well

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- run to create extension only after you connect to the database using \c cosb
-- the extension is required for any user related tables to function properly as a user_id of a user is of the type uuid

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar NOT NULL,
    password varchar NOT NULL,
    banned boolean NOT NULL
);
-- banned:
    -- if false -> user is not banned
    -- if true -> user is banned

CREATE TABLE admin (
    user_id uuid NOT NULL,
    canban boolean NOT NULL,
    candelete boolean NOT NULL,
    canaddadmin boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- canban:
    -- if true -> admin user can ban registered users
    -- if false -> admin user cannot ban registered users
-- candelete:
    -- if true -> admin user can delete posts
    -- if false -> admin user cannot delete posts
-- canaddadmin:
    -- if true -> admin user can add other registered user as admin or remove other admin user
    -- if false -> admin user cannnot add other registered user as admin or remove other admin user

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    professor varchar,
    post_body varchar NOT NULL,
    code varchar(9) NOT NULL,
    rating integer NOT NULL,
    user_id uuid NOT NULL,
    post_type boolean NOT NULL,
    FOREIGN KEY (code) REFERENCES courses(code) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- post_type:
    -- if false -> the post is a description
    -- if true -> the post is a review

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    post_id integer NOT NULL,
    vote boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);
-- vote
    -- if false -> the vote is an upvote
    -- if true -> the vote is a downvote

CREATE TABLE flags (
    flag_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    post_id integer NOT NULL,
    post_type boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);
-- post_type:
    --if false -> the flag is for a description post
    --if true -> the flag is for a review post