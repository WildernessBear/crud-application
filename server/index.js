const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dexter',
    database: 'cruddatabase',
});

app.use(cors());
app.use(express.json()); // applies middleware to get req from frontend
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get', (req, res) => {
    const sqlSelect =
        'SELECT * FROM movie_reviews';
    db.query(sqlSelect, (err, result) => {
        // send this info to frontend
        res.send(result);
    });
});
    

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview


    const sqlInsert = 'INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);'
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001')
});