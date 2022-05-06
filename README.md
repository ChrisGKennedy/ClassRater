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

* `/server` - All of the backend code and middleware, including the database, REST API routes, and user authentication.  
    * `index.js` - Holds all all REST API routes that does not relate to authentication
    * `db.js` - Holds user, password, host, port and name to access the postgres database
    * `/routes` - Holds REST API routes for authentication
    * `/utils` - Holds code to generate encryprted token for authentication
        * `.env` - Holds secret used to encrypt information in jwtGenerator.js under `/utils`. information in `.env` can be any text as long as it is not changed throughout the usage of the application
    * `/middleware` - Holds REST API middleware mainly used for authentication
    * `database.sql` - Holds postgres commands to create the database used for the project
    * `cosb_Data.csv` - csv file holding data to copy over into the database. Command to copy information can be found in `database.sql`


* `/client` - All of the front-end code that makes stuff actually appear on the page and interact with the backend.
    * `Login.js` - Component for the login page. Users can login with a registered email and password here. Redirects to the Dashboard instead if a user is already logged in.
    * `Register,js` - Component for the registeration page. Useres can give an email and password to register with. Redirects to the Dashboard instead if a user is already logged in.
    * `Dasboard.js` - Component for the dashboard page. Functions as a logout button.
    * `Description.js` - Overarching component for the course info page. Requires a course code to render information properly and code is taken from the url in the format `/description?code=CSCI-3321`. Passes course code to `CourseText.js` and `ListPost.js`.
    * `CourseText.js` - Component that fetches and renders course code, course name, and course descriptions based on from the database using the course code passed in from `Description.js`.
    * `ListPost.js` - Component that fetches and renders all posts made for a given course. When a user is not logged in, then the component will only render a professor name, the post body, and the rating of the post. When a user is logged in the component will also render a flag button, an upvote button, and a downvote button for each post, and will also render text input forms so that the logged in user can make a post.
    * `MakePost.js` - Component that holds the code for the text input form that renders in `ListPost.js` and creates the post in the database.
    * `FlagButton.js` - Component that renders and holds the functionality for the flag button of each post.
    * `Voting.js` - Component that renders and holds functionality for the upvote and downvote button of each post.


## How to make it work
1. Install postgresql from postgresql.org. Also make sure you have node installed.
2. Make sure the fields in db.js match with your postgres user/password and port.
3. In the terminal with psql running, you need to paste in the queries in /server/database.sql one by one to set up the database. Make sure the file path to cosb_Data.csv is the absolute file path on your computer.
4. Navigate to /server and type ```npm install```. Do the same in /client
5. Type ```node index``` in server and ```npm start``` in client.

## Testing REST API Routes
1. Install postman from https://www.postman.com/downloads/
2. Once in postman open or create a workspace from the nav bar at the top of the home page.
3. In the workspace create a new tab to start making requests
4. Insert REST API route url you want to test and select the appropriate request type.
    * If the request requires a body, then click on the body tab and then select `JSON` from the options that appear on the very right when you select the body tab. Once `JSON` is selected you can start writing the body.
    The body should resemble: 
    ```
    {
        "key 1" : value,
        "key 2" : "a string"
    }
    ```
    * If the request requires a header, then click on the header tab and a table shoudl appear. Under the key column write enter the key name and under the value column enter the value of the item.
5.  Click send
6. Check if the appropriate response shows up.

## Using the Application

### Registeration Page
* A user can enter an email and password to register.
* If an email is already registered or appropriate credentials are not provided, then the registeration will fail.

### Login Page
* A user can enter a registered email and password to login.
* If the user is not registered or does not enter the correct credentials, then the login will fail.

### Dashboard Page
* Is a logout button.

### Course Info Page
* Course info page should automatically render in appropriate content if you navigated from the search results page. 
    * Alternatively a user can write `.../description?code=`  and then the course code in the url to manually navigate to the specified course code.
* A user can view any posts associated to the course if any exist and switch the type of post that are displayed at by clicking the `description ` and `review` buttons.
* If a user is logged in they can also flag a post that is inappropriate, and upvote or downvote a post they like/dislike by clicking on the repective buttons.
    * posts will be ordered in order of the rating, so when a user votes on a post that can cause the order of the posts to change.
* A logged in user can also see two text input forms render at the bottom of the page. The user can enter a professor name in the first form to indicate which professor they took the course with and enter the post body in the second text input form.
    * The professor name is optional, so a post can be made without the user indicating a professor.
