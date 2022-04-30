const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
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

app.get("/users", async(req, res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }catch (err){
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


