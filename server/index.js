const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/jwtAuth"));

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

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

app.get("/courses", async (req, res) => {
    try {
        const allCourses = await pool.query("SELECT * FROM courses");
        res.json(allCourses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

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

app.post("/posts", async(req, res) => {
    try {
        //const desc = req.body.desc_body;
        //const code = req.body.code;
        const newPost = await pool.query("INSERT INTO posts (post_body,code,rating,user_id,post_type,professor) VALUES ($1,$2,0,$3,$4,$5) RETURNING *", 
            [req.body.post_body, req.body.code, req.body.user_id, req.body.post_type, req.body.professor]);

        res.json(newPost.rows[0]);
        //res.json();
        console.log(req.body);
        //console.log(desc);
    } catch (err) {
        console.error(err.message)
    }
});

app.get("/posts", async(req, res) => {
    try {
        const allDescs = await pool.query("SELECT * FROM posts");
        res.json(allDescs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/posts/descriptions/code:code", async (req, res) => {
    try {
        const { code } = req.params;
        const descs = await pool.query("SELECT * FROM posts WHERE code = $1 AND post_type = 'false' ORDER BY rating DESC", [code]);

        res.json(descs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/posts/reviews/code:code", async (req, res) => {
    try {
        const { code } = req.params;
        const descs = await pool.query("SELECT * FROM posts WHERE code = $1 AND post_type = 'true' ORDER BY rating DESC", [code]);

        res.json(descs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/posts/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const deletePost = await pool.query("DELETE FROM posts WHERE post_id = $1", [id]);

        res.json("post was deleted");
    } catch (err) {
        console.error(err.message)
    }
});

app.put("/posts/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const {rating} = req.body;
        const updaterating = await pool.query("UPDATE posts SET rating = $1 WHERE post_id = $2", [rating, id]);

        res.json("rating was updated.");
    } catch (err) {
        console.error(err.message);
    }
})

app.use("/dashboard", require("./routes/dashboard"));

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

app.get("/flags", async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM flags");

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/flags/:post_id/:user_id", async(req,res) => {
    try {
        const response = await pool.query("SELECT * FROM flags WHERE post_id = $1 AND user_id = $2", 
        [req.params.post_id, req.params.user_id]);

        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

app.delete("/flags/:flag_id", async(req,res) => {
    try {
        const id = req.params.flag_id;
        const deleteFlag = await pool.query("DELETE FROM flags WHERE flag_id = $1", [id]);

        res.json("flag was deleted");
    } catch (err) {
        console.error(err.message);
    }
});