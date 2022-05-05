# ClassRater

This repo contains all the code to build our web app. We use the PERN Stack (Postgresql database, Express server, React front-end, Node)

## What is ClassRater?

ClassRater - a platform that is the mix between ratemyprofessor.com and the Trinity Course of Study Bulletin.

- Ability to search for classes
- Ability to make descriptions and reviews (posts)
- With many users, we need moderation abilities
- Ability for any user to flag posts if logged in
- Admin pages for Flags, Bans, and Posts

## A tour of our codebase

/server - all of the backend code and middleware, including the database, REST API routes, and user authentication.  
/client - all of the front-end code that makes stuff actually appear on the page and interact with the backend.

## How to make it work
1. Install postgresql from postgresql.org. Also make sure you have node installed.
2. Make sure the fields in db.js match with your postgres user/password and port.
3. In the terminal with psql running, you need to paste in the queries in /server/database.sql one by one to set up the database. Make sure the file path to cosb_Data.csv is the absolute file path on your computer.
4. Navigate to /server and type ```npm install```. Do the same in /client
5. Type ```node index``` in server and ```npm start``` in client.
