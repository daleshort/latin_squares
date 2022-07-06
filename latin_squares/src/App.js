import React from "react";
import "./App.css";
import Square from "./Square";

function App() {
  return (
    <div class="App">
      <nav class="navbar">
        <div class="container">
          <div class="logo">Latin Squares</div>
          <ul class="nav">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <header class="header">
        <div class="container">
          <div>
            <h1>Latin Square Sudoku</h1>
            <p>A crazy game of Sudoku that I barely understand.</p>
          </div>
        </div>
        <div class="container" id="app">
          <Square />
        </div>
      </header>

      <section class="boxes">
        <div class="container">
          <div class="box">
            <h2>
              <i class="fas fa-mobile"></i>How to play
            </h2>
            <p>This could be some instructions about how to play the game!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
