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
app.use(bodyParser.urlencoded({ extended: true }));

// READ
app.get('/api/get', (req, res) => {
    const sqlSelect =
        'SELECT * FROM movie_reviews';
    
    db.query(sqlSelect, (err, result) => {
        // send this info to frontend
        res.send(result);
    });
});
    
// CREATE
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert =
        'INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);'
    
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

// DELETE
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete =
        'DELETE FROM movie_reviews WHERE movieName = ?';
    
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
})

// UPDATE
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate =
        'UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?';
    
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
})

app.listen(3001, () => {
    console.log('running on port 3001')
});