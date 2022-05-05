const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require ("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// creates a user with email and password inputted
// uses validInfo function in the file "validInfo.js" under the folder "middleware"
// validInfo checks if neede credentials(email and password) are entered and if the entered email is valid
router.post("/register", validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;

        // gets any existing user that has the same email as the inputted email
        const user = await pool.query("SELECT * FROM users WHERE email = $1", 
        [email]);

        // if a user with inputted email already exists, then a user is not registered
        if(user.rows.length !== 0){
            return res.status(401).send("User already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        // encrypts password
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("Insert INTO users (email, password, banned) VALUES ($1, $2, false) RETURNING *", 
        [email, bcryptPassword]);

        // returns an encrypted user id
        const token = jwtGenerator(newUser.rows[0].user_id);
        
        // output is an encrypted user id as a token
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// registered users can login using their registered email and password
// uses validInfo function in the file "validInfo.js" under the folder "middleware"
// validInfo checks if neede credentials(email and password) are entered and if the entered email is valid
router.post("/login", validInfo, async (req, res) => {
    try {
        const {email, password} = req.body;

        // gets a user with the same email as the inputted email
        const user = await pool.query("SELECT * FROM users WHERE email = $1 AND banned = false", [email]);

        // if a user with the email does not exist, then login fails
        if(user.rows.length === 0){
            return res.status(401).json("Email or Password is incorrect");
        }

        // compares inputted password with password in the database
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        // if passwords do not match login fails
        if(!validPassword){
            return res.status(401).json("Email or Password is incorrect");
        }

        // returns an encrypted user id
        const token = jwtGenerator(user.rows[0].user_id);

        // output is an encrypted user id as a token
        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// checks if login has expired or if the token is valid
// uses authorization function found in the file "authorization.js" under the folder "middleware"
// inputted token are in the header and processed in the authorization function instead of here
router.get("/isverified", authorization, async (req, res) => {
    try {
        
        // if token is not verified authorization function will fail, so the only time this code runs is when the token is verified
        res.json(true);

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;