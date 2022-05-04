const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

app.get("/users", async(req, res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }catch (err){
        console.error(err.message);
    }
});


app.post("/users", async(req, res) => {
    try{
        const { email } = req.body.email;
        const { password } = req.body.password;
        const newUser = await pool.query(
            "INSERT INTO users (email, password, banned) VALUES($1, $2, false) RETURNING *", 
            [email, password]
        );

        res.json(newUser.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

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

app.post("/flags", async(req, res) => {
    try{
        const { user_id } = req.body.user_id;
        const { post_id } = req.body.post_id;
        const { post_type } = req.body.post_type;
        const newFlag = await pool.query(
            "INSERT INTO flags (user_id, post_id, banned) VALUES($1, $2, $3) RETURNING *", 
            [user_id, post_id, post_type]
        );

        res.json(newFlag.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

app.get("/flags", async(req, res) => {
    try{
        const allFlags = await pool.query("SELECT * FROM flags");
        res.json(allFlags.rows);
    }catch (err){
        console.error(err.message);
    }
});

app.delete("/flags/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        const deletFlags = await pool.query("DELETE FROM flags WHERE flag_id = $1", [id]);

        res.json("flag was deleted");
    }catch (err){
        console.error(err.message);
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = await pool.query("SELECT * FROM posts WHERE post_id = $1", [id]);

        res.json(body.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await pool.query("DELETE FROM posts WHERE post_id = $1", [id]);

        res.json("post was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/posts", async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");

        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

