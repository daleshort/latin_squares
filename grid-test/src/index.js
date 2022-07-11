import React, { useReducer, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MyFirstGridFunctional from "./MyFirstGridFunctional";
import "./MyFirstGridFunctional.css";
import Button from "react-bootstrap/Button";

let squareDataTest1 = require("./test_square_data.json");
let squareDataTest2 = require("./test_square_data2.json");
let highlightDataTest1 = require("./test_highlight_data.json");
let highlightDataTest2 = require("./test_highlight_data.json"); // same file right now

class squareDataClass {
  constructor() {
    const value = null; //current value of square
    const value_correct = null; //answer
    const value_start = null; // value prepopulated on the board.  if set square will not be editable
    const id = "";
    const row = null;
    const col = null;
    const isSelected = false;
    const square_click_handler = null;
    const handleFocusAway = null;
    const showSolution = null; //adding in show solution here for square based solution showing.  Not used yet
  }
}

class highlightDataClass {
  constructor() {
    const x = null;
    const y = null;
    const w = null;
    const h = null;
    const id = null;
    const type = "primary";
  }
}

//FUNCTIONAL GAME MANAGER DEFINITION
// ---------------------------------//

function GameManagerFunctional({
  squareDataTest1 = null,
  squareDataTest2 = null,
  highlightDataTest1 = null,
  highlightDataTest2 = null,
  showSolution = false,
}) {
  //click support_________________________
  function handleClick(i) {
    const copy_squares = state.squareData.slice(); //copy entire square class array
    copy_squares.map((x, i) => {
      x.isSelected = false;
      return x;
    });
    copy_squares[parseInt(i)].isSelected = true;
    setState({ squareData: copy_squares });
  }

  //Key press suppport________________
  //https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
  const handleUserKeyPress = useCallback((event) => {
    const copy_squares = state.squareData.slice();
    if ("1234567890".includes(event.key)) {
      console.log("key press:" + event.key);
      copy_squares.map((x, i) => {
        if (x.isSelected == true) {
          x.value = event.key;
        }
        return x;
      });
    } else {
      copy_squares.map((x, i) => {
        if (x.isSelected == true) {
          x.value = "";
        }
        return x;
      });
    }
    setState({ squareData: copy_squares });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  //Focus away support_______________________

  //this has a bug where it's not doing anything with the value passed back to it
  const handleFocusAway = useCallback((square) => {
    const copy_squares = state.squareData.slice();
    copy_squares.map((x, i) => {
      if (x.isSelected == true) {
        x.isSelected = false;
      }
      return x;
    });
    setState({ squareData: copy_squares });
  }, []);

  function intializeSquareData(JsonData) {
    let squares_array = new Array();
    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      const square = new squareDataClass();
      square.value = element.value;
      square.value_correct = element.value_correct;
      square.value_start = element.value_start;
      square.id = element.id;
      square.row = element.row;
      square.col = element.col;

      square.square_click_handler = handleClick;
      square.handleFocusAway = handleFocusAway;
      squares_array.push(square);
    }
    return squares_array;
  }

  function intializeHighlightData(JsonData) {
    let highlight_array = new Array();

    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      const highlight = new highlightDataClass();
      highlight.x = element.x;
      highlight.y = element.y;
      highlight.w = element.w;
      highlight.h = element.h;
      highlight.id = element.id;
      highlight.type = element.type;

      highlight_array.push(highlight);
    }
    return highlight_array;
  }

  function intializeLayoutSquares(JsonData) {
    let layout_array = new Array();
    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      //now make the layout
      layout_array.push({
        x: parseInt(element.col),
        y: parseInt(element.row),
        w: 1,
        h: 1,
        i: element.id.toString(),
      });
    }
    return layout_array;
  }

  //this could easily be merged with the function above
  function intializeLayoutHighlights(JsonData) {
    let layout_array = new Array();

    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];

      //now make the layout
      layout_array.push({
        x: parseInt(element.x),
        y: parseInt(element.y),
        w: parseInt(element.w),
        h: parseInt(element.h),
        i: element.id.toString(),
      });
    }
    return layout_array;
  }

  //do we need to useEffect tied to stat.squareData
  //to update the layout if squareData is changed?

  //take the input square data and call a function that
  //maps the input square data to the state of squares
  // this later should start with empty JSON but
  //then have a fuction to go and get this JSON
  //these modify state.  need to write intializing versions
  //setSquareDataFromJson(squareDataTest1);
  //setHighlightDataFromJson(highlightDataTest1);

  function setHighlightDataFromJson(JsonData) {
    let highlight_array = new Array();
    let layout_array = new Array();

    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      const highlight = new highlightDataClass();
      highlight.x = element.x;
      highlight.y = element.y;
      highlight.w = element.w;
      highlight.h = element.h;
      highlight.id = element.id;
      highlight.type = element.type;

      highlight_array.push(highlight);

      //now make the layout
      layout_array.push({
        x: parseInt(highlight.x),
        y: parseInt(highlight.y),
        w: parseInt(highlight.w),
        h: parseInt(highlight.h),
        i: highlight.id.toString(),
      });
    }
    setState({
      hightlightData: highlight_array,
      layoutHighlights: layout_array,
    });
  }

  // https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re

  function setSquareDataFromJson(JsonData) {
    let squares_array = new Array();
    let layout_array = new Array();
    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      const square = new squareDataClass();
      square.value = element.value;
      square.value_correct = element.value_correct;
      square.value_start = element.value_start;
      square.id = element.id;
      square.row = element.row;
      square.col = element.col;

      square.square_click_handler = handleClick;
      square.handleFocusAway = handleFocusAway;
      squares_array.push(square);

      //now make the layout
      layout_array.push({
        x: parseInt(square.col),
        y: parseInt(square.row),
        w: 1,
        h: 1,
        i: square.id.toString(),
      });
    }
    setState({ squareData: squares_array, layoutSquares: layout_array });
  }

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      squareData: intializeSquareData(squareDataTest1),
      highlightData: intializeHighlightData(highlightDataTest1),
      keypress: "",
      layoutSquares: intializeLayoutSquares(squareDataTest1),
      layoutHighlights: intializeLayoutHighlights(highlightDataTest1),
    }
  );

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
          <MyFirstGridFunctional
            squareData={state.squareData}
            highlightData={state.highlightData}
            layoutSquares={state.layoutSquares}
            layoutHighlights={state.layoutHighlights}
            showSolution={state.showSolution} //remove this later
          />
        </div>
        {/* <Button onClick={this.handleSetState1}>set state 1</Button>
        <Button onClick={this.handleSetState2}>set state 2</Button>
        <Button onClick={this.handleClearBoard}>clear board</Button>
        <Button onClick={this.handleShowSolution}>Show Solutions</Button> */}
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

// ROOT IMPLEMENTATION OF GAME MANAGER HERE

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameManagerFunctional
      squareDataTest1={squareDataTest1}
      squareDataTest2={squareDataTest2}
      highlightDataTest1={highlightDataTest1}
      highlightDataTest2={highlightDataTest2}
    />
  </React.StrictMode>
);

//OLD GAME MANAGER STARTS HERE _____________________
//_________________________________________________
//_________________________________________________
//_________________________________________________
//_________________________________________________

class GameManager extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      squareData: this.props.squareData,
      highlightData: this.props.highlightData,
      showSolution: false,
    };

    this.handleSetState1 = this.handleSetState1.bind(this);
    this.handleSetState2 = this.handleSetState2.bind(this);
    this.handleClearBoard = this.handleClearBoard.bind(this);
    this.handleShowSolution = this.handleShowSolution.bind(this);
  }

  handleClearBoard() {
    this.setState({ squareData: [] });
  }
  handleSetState1() {
    this.setState({ squareData: this.props.squareData });
  }
  handleSetState2() {
    this.setState({ squareData: this.props.squareData2 });
  }

  handleShowSolution() {
    this.setState({ showSolution: !this.state.showSolution });
  }

  render() {
    //  console.log("rerender main component");
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
            <MyFirstGridFunctional
              testing={false}
              squareData={this.state.squareData}
              highlightData={this.state.highlightData}
              showSolution={this.state.showSolution}
            />
          </div>
          <Button onClick={this.handleSetState1}>set state 1</Button>
          <Button onClick={this.handleSetState2}>set state 2</Button>
          <Button onClick={this.handleClearBoard}>clear board</Button>
          <Button onClick={this.handleShowSolution}>Show Solutions</Button>
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
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
