import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
    
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieReview" />
        <label>Review:</label>
        <input type="text" name="review" />

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
