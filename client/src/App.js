import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  });

  // called everytime sumbit button pressed
  const submitReview = () => { 
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      alert("successful insert");
    });
  };

  return (
    <div className="App">
    
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieReview"
          onChange={(e) => {
            setMovieName(e.target.value)
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value)
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => { // display reviews to site
          return <h2> <u>Movie</u>:  {val.movieName} | <u>Review</u>: {val.movieReview} </h2>
        })}
      </div>
    </div>
  );
}

export default App;
