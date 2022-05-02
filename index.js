
//ROUTES

//search for course

app.get("/search/:query", async (req, res) =>  {
try {
    const {query} = req.params;
    console.log(query);
    const searchResults = await pool.query(
        "SELECT * FROM courses WHERE name LIKE $1",
        ["%" + query + "%"]
    );

    res.json(searchResults.rows);
} catch (err) {
    console.error(err.message);
}


});


