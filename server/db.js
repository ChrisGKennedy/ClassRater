const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "webapp",
    host: "localhost",
    port: 5432,
    database: "cosb"
});

module.exports = pool;