const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
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
        const newPost = await pool.query("INSERT INTO posts (professor,post_body,code,rating,user_id,post_type) VALUES ('Dr. Temp',$1,$2,0,0,$3) RETURNING *", 
            [req.body.post_body, req.body.code, req.body.post_type]);

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
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM posts WHERE post_id = $1", [id]);

        res.json("post was deleted");
    } catch (err) {
        console.error(err.message)
    }
});

app.put("/posts/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {rating} = req.body;
        const updaterating = await pool.query("UPDATE posts SET rating = $1 WHERE post_id = $2", [rating, id]);

        res.json("rating was updated.");
    } catch (err) {
        console.error(err.message);
    }
})
