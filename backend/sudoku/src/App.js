import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  function displayPuzzle() {
    fetch('/GetPuzzle').then(res => res.json()).then(data => {
      setCurrentPuzzle(JSON.stringify(data));
    });
    return(
      console.log('Getting a new board!')
      // alert(currentPuzzle)
      )
  }

  const [currentPuzzle, setCurrentPuzzle] = useState(0);

  useEffect(() => {
    fetch('/GetPuzzle').then(res => res.json()).then(data => {
      setCurrentPuzzle(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="App">
        <button onClick={displayPuzzle}>New Board</button>
        <p>{currentPuzzle}</p>
    </div>
  );
}

export default App;
