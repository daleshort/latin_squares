import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MyFirstGrid from "./MyFirstGrid";
import "./MyFirstGrid.css";

let json = require("./test_square_data.json");
console.log("test data", json);

class GameManager extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="logo">Latin Squares</div>
            <ul className="nav">
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

        <header className="header">
          <div className="container">
            <div>
              <h1>ReactDoku</h1>
              <p>
                A crazy game of Latin Square Sudoku that I barely understand.
                Built in React by James and Dale at The Recurse Center
              </p>
            </div>
          </div>
          <div className="container" id="app">
            <MyFirstGrid testing={false} squareData={this.props.squareData} />
          </div>
        </header>

        <section className="boxes">
          <div className="container">
            <div className="box-footer">
              <h2>
                <i className="fas fa-mobile"></i>How to play
              </h2>
              <p>This could be some instructions about how to play the game!</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // render() {
  //   return <MyFirstGrid testing={false} squareData={this.props.squareData} />;
  // }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameManager squareData={json} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
