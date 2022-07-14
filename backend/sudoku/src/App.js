import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  function displayPuzzle() {
    return(
      // alert(JSON.stringify(fetch('/GetPuzzle')))
      alert(currentPuzzle)
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
        <button onClick={displayPuzzle}>See Puzzle</button>
    </div>
  );
}

export default App;
