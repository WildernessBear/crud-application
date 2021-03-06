import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  // called everytime sumbit button pressed
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    });

    // updates webpage after submitting without refreshing
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };
  
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie,
      movieReview: newReview,
    });
    //this.setState({ movieName: movie, movieReview: newReview });
    
    // clear string so empty next time
    setNewReview('');
  };

  return (
    <div className='App'>

      <h1>Movie Reviews</h1>

      <div className='form'>
        <label>Movie Name:</label>
        <input
          type='text'
          name='movieReview'
          onChange={(e) => {
            setMovieName(e.target.value)
          }}
        />

        <label>Review:</label>
        <input
          type='text'
          name='review'
          onChange={(e) => {
            setReview(e.target.value)
          }}
        />

        <button class="submit-btn btn" onClick={submitReview}>
          Submit
        </button>

        {movieReviewList.map((val) => { // display reviews to site
          return (
            <div className='card'>
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button class="delete-btn btn" onClick={() => { deleteReview(val.movieName) }}>
                Delete
              </button>

              <input
                type='text'
                id='updateInput'
                onChange={(e) => {
                  setNewReview(e.target.value)
                }} />
        
              <button class="update-btn btn" onClick={() => { updateReview(val.movieName) }}>
                Update
              </button>
            </div>
            
          );
        })}
      </div>
    </div>
  );
}

export default App;
