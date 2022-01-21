const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dexter",
    database: "cruddatabase",
});

app.get('/', (req, res) => {
    
    // const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
    // db.query(sqlInsert, (err, result) => {
    //     console.log(err);
    //     res.send("hello melinda");
    // });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});