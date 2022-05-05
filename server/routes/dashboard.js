const router = require("express").Router();
const pool = require("../db");
const authorization = require(`../middleware/authorization`);


// retrieves user information by using the token inputted into the header
// uses authorization function found in the file "authorization.js" under the folder "middleware"
// authorization will set req.user for you if the token is valid, so no input aside from the token in the header is needed
router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_id, email, banned FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;