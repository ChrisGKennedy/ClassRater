const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "webapp",
//     host: "localhost",
//     port: 5432,
//     database: "cosb"
// });

const pool = new Pool({
    max: 10,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;