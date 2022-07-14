import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  function displayPuzzle6() {
    fetch('/GetPuzzle').then(res => res.json()).then(data => {
      setCurrentPuzzle(JSON.stringify(data));
    });
    return(
      console.log('Getting a new board!')
      // alert(currentPuzzle)
      )
  }

  function displayPuzzle8() {
    fetch('/GetPuzzle8').then(res => res.json()).then(data => {
      setCurrentPuzzle(JSON.stringify(data));
    });
    return(
      console.log('Getting a new board!')
      // alert(currentPuzzle)
      )
  }

  function displayPuzzle10() {
    fetch('/GetPuzzle10').then(res => res.json()).then(data => {
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
        <button onClick={displayPuzzle6}>New Order 6 Board</button>
        <button onClick={displayPuzzle8}>New Order 8 Board</button>
        <button onClick={displayPuzzle10}>New Order 10 Board</button>
        <p>{currentPuzzle}</p>
    </div>
  );
}

export default App;
