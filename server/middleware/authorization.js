const jwt = require("jsonwebtoken");
require("dotenv").config();

// checks if token inputted in the header is valid
// should never be used alone (and probably cannot be)
module.exports = async(req, res, next) => {
    try {
        
        const jwtToken = req.header("token");

        if(!jwtToken) {
            return res.status(403).json("Not Authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorize");
    }
};