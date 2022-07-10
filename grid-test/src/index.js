import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MyFirstGrid from "./MyFirstGrid";
import "./MyFirstGrid.css";
import Button from "react-bootstrap/Button";

let json = require("./test_square_data.json");
console.log("test data", json);
let json2 = require("./test_square_data2.json");
console.log("test data2", json2);

class GameManager extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { squareData: this.props.squareData, hasComponent: true };

    this.handleClickClear1 = this.handleClickClear1.bind(this);
    this.handleClickClear2 = this.handleClickClear2.bind(this);
    this.handleSetState1 = this.handleSetState1.bind(this);
    this.handleSetState2 = this.handleSetState2.bind(this);
    this.handleAutoClearState = this.handleAutoClearState.bind(this);
  }

  handleClickClear1() {
    console.log("has component false");
    this.setState({ hasComponent: false });
  }

  handleClickClear2() {
    console.log("has component true");
    this.setState({ hasComponent: true });
  }

  handleSetState1() {
    this.setState({ squareData: this.props.squareData });
  }
  handleSetState2() {
    this.setState({ squareData: this.props.squareData2 });
  }

  handleAutoClearState() {
    this.setState({ hasComponent: false });
    //this is all sorts of wrong
    setTimeout(() => {
      this.setState({ squareData: this.props.squareData2 });
      this.setState({ hasComponent: true });
    }, 2);
  }

  render() {
    console.log("rerender main component");
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
            {this.state.hasComponent && (
              <MyFirstGrid testing={false} squareData={this.state.squareData} />
            )}
          </div>
          <Button onClick={this.handleClickClear1}> Clear Board1</Button>
          <Button onClick={this.handleClickClear2}> Show board</Button>
          <Button onClick={this.handleSetState1}> set state 1</Button>
          <Button onClick={this.handleSetState2}> set state 2</Button>
          <Button onClick={this.handleAutoClearState}>
            {" "}
            auto change state
          </Button>
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
    <GameManager squareData={json2} squareData2={json} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
