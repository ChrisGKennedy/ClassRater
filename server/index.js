const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// functions related to authentication is in file named "jwtAuth" under the folder "routes"
app.use("/auth", require("./routes/jwtAuth"));

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

// searches for courses based on key word passed to it
app.get("/search:query", async (req, res) =>  {
	try {
			const {query} = req.params;
			console.log(query);
            console.log("query being submitted!")
			const searchResults = await pool.query(
					"SELECT * FROM courses WHERE course_name LIKE $1",
					["%" + query + "%"]
			);
			res.json(searchResults.rows);
	} catch (err) {
			console.error(err.message);
	}
});

// gets a list of all users registered
app.get("/users", async(req, res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }catch (err){
        console.error(err.message);
    }
});

// gets a list of all courses in the database
app.get("/courses", async (req, res) => {
    try {
        const allCourses = await pool.query("SELECT * FROM courses");
        res.json(allCourses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// gets a course that matches the course code entered
// course codes are unique so there should only be one
app.get("/courses/code:code", async (req, res) => {
    try {
        const { code } = req.params;
        const course = await pool.query("SELECT * FROM courses WHERE code = $1", [code]);

        console.log(req.params);
        res.json(course.rows[0]);
    } catch (err) {
        console.error(err.message);
        console.log(req.params);
    }
});

// gets a course that matches the course name entered
// course names are potentially not unique and therefore this can return multiple items
app.get("/courses/course_name:name", async (req, res) => {
    try {
        const { name } = req.params;
        const courses = await pool.query("SELECT * FROM courses WHERE course_name = $1", [name]);

        console.log(req.params);
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
        console.log(req.params);
    }
});

// creates a post
// posts must have some text(post_body), some course code(course_code), a user id(user_id), and a post type(post_type)
// professor for a post is optional
// the type for each input can be found under "CREATE TABLE posts" in the "server" folder in the file "database.sql"
app.post("/posts", async(req, res) => {
    try {
        const newPost = await pool.query("INSERT INTO posts (post_body,code,rating,user_id,post_type,professor) VALUES ($1,$2,0,$3,$4,$5) RETURNING *", 
            [req.body.post_body, req.body.code, req.body.user_id, req.body.post_type, req.body.professor]);

        res.json(newPost.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message)
    }
});

// gets every post related to every course
app.get("/posts", async(req, res) => {
    try {
        const allDescs = await pool.query("SELECT * FROM posts");
        res.json(allDescs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a post based on the id entered
// post_id are unique
app.get("/posts/:id", async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM posts WHERE post_id = $1",
            [req.params.id]);

        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get all description posts for a given course code
app.get("/posts/descriptions/code:code", async (req, res) => {
    try {
        const { code } = req.params;
        const descs = await pool.query("SELECT * FROM posts WHERE code = $1 AND post_type = 'false' ORDER BY rating DESC", [code]);

        res.json(descs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all review posts for a given course code
app.get("/posts/reviews/code:code", async (req, res) => {
    try {
        const { code } = req.params;
        const descs = await pool.query("SELECT * FROM posts WHERE code = $1 AND post_type = 'true' ORDER BY rating DESC", [code]);

        res.json(descs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// deletes the post with the specified post id
app.delete("/posts/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const deletePost = await pool.query("DELETE FROM posts WHERE post_id = $1", [id]);

        res.json("post was deleted");
    } catch (err) {
        console.error(err.message)
    }
});

// updates the rating to any specified integer for a post specified by the id
// this route is not currently used in the client side, but can be useful if the rating of a post is not correctly updated
app.put("/posts/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const {rating} = req.body;
        const updaterating = await pool.query("UPDATE posts SET rating = $1 WHERE post_id = $2", [rating, id]);

        res.json("rating was updated.");
    } catch (err) {
        console.error(err.message);
    }
});

// increases the rating of a post by 1
app.put("/posts/increment/:id", async(req, res) => {
    try {
        const updaterating = await pool.query("UPDATE posts SET rating = rating + 1 WHERE post_id = $1",
            [req.params.id]);

        res.json("rating was incremented by 1");
    } catch (err) {
        console.log(err.message, req.params.id);
    }
});

// decreases the rating of a post by 1
app.put("/posts/decrement/:id", async(req, res) => {
    try {
        const updaterating = await pool.query("UPDATE posts SET rating = rating - 1 WHERE post_id = $1",
            [req.params.id]);

        res.json("rating was decremented by 1");
    } catch (err) {
        console.log(err.message, req.params.id);
    }
});

// increases the rating of a post by 2
app.put("/posts/increment2/:id", async(req, res) => {
    try {
        const updaterating = await pool.query("UPDATE posts SET rating = rating + 2 WHERE post_id = $1",
            [req.params.id]);

        res.json("rating was incremented by 2");
    } catch (err) {
        console.log(err.message, req.params.id);
    }
});

// decreases the rating of a post by 2
app.put("/posts/decrement2/:id", async(req, res) => {
    try {
        const updaterating = await pool.query("UPDATE posts SET rating = rating - 2 WHERE post_id = $1",
            [req.params.id]);

        res.json("rating was decremented by 2");
    } catch (err) {
        console.log(err.message, req.params.id);
    }
});

// gets user information for the currently logged in user
// code is under the file "dashboard" under the folder "routes"
app.use("/dashboard", require("./routes/dashboard"));

// creates a flag
// flags must have a user id, a post id, a post type
// the type for each input can be found under "CREATE TABLE flags" in the "server" folder in the file "database.sql"
app.post("/flags", async(req, res) => {
    try {
        const newFlag = await pool.query("INSERT INTO flags (user_id,post_id,post_type) VALUES ($1,$2,$3) RETURNING *", 
        [req.body.user_id, req.body.post_id, req.body.post_type]);

        res.json(newFlag.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

// gets all flags
app.get("/flags", async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM flags");

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// gets flags with the specified post id and user id
// the combination of the two id should be unique
app.get("/flags/:post_id/:user_id", async(req,res) => {
    try {
        const response = await pool.query("SELECT * FROM flags WHERE post_id = $1 AND user_id = $2", 
        [req.params.post_id, req.params.user_id]);

        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

// deletes the flag with the specified id
app.delete("/flags/:flag_id", async(req,res) => {
    try {
        const id = req.params.flag_id;
        const deleteFlag = await pool.query("DELETE FROM flags WHERE flag_id = $1", [id]);

        res.json("flag was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// creates a vote
// votes must have a user id, a post id, and a vote type(vote)
// the type for each input can be found under "CREATE TABLE votes" in the "server" folder in the file "database.sql"

app.post("/votes", async(req, res) => {
    try {
        const newVote = await pool.query("INSERT INTO votes (user_id, post_id, vote) VALUES ($1,$2,$3) RETURNING *",
            [req.body.user_id, req.body.post_id, req.body.vote]);

        res.json(newVote.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

// gets all votes
app.get("/votes", async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM votes");

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// gets vote with the specified id
app.get("/votes/:id", async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM votes WHERE vote_id = $1", 
            [req.params.id]);

        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// gets vote with the specified post id and user id
// combination of the two id should be unique
app.get("/votes/:post_id/:user_id", async(req,res) => {
    try {
        const response = await pool.query("SELECT * FROM votes WHERE post_id = $1 AND user_id = $2", 
        [req.params.post_id, req.params.user_id]);

        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

// updates vote type(vote) to specified boolean value
app.put("/votes/:id", async(req, res) => {
    try {
        const response = await pool.query("UPDATE votes SET vote = $1 WHERE vote_id = $2",
            [req.body.vote, req.params.id]);

        res.json("vote was updated");
    } catch (err) {
        console.error(err.message)
    }
});

// deletes vote with the specified id
app.delete("/votes/:id", async(req, res) => {
    try {
        const response = await pool.query("DELETE FROM votes WHERE vote_id = $1", 
            [req.params.id]);

        res.json("vote was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// updates a user's ban flag
app.put("/users/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const { banned } = req.body;
        const updateUser = await pool.query(
            "UPDATE users SET banned = $1 WHERE user_id = $2",
            [banned, id]
        );

        res.json("User was updated!");
    }catch (err){
        console.error(err.message);
    }
});