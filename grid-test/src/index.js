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
let highlightDataTest2 = require("./test_highlight_data2.json"); // same file right now

class squareDataClass {
  constructor() {
    const value = null; //current value of square
    const value_correct = null; //answer
    const value_start = null; // value prepopulated on the board.  if set square will not be editable
    const id = "";
    const row = null;
    const col = null;
    const isSelected = false;
    const isInHighlight = false;
    const square_click_handler = null;
    const handleFocusAway = null;
    const showSolution = false; //adding in show solution here for square based solution showing.  Not used yet
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
    const isHighlighted = false;
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

  function setInHighlight(my_highlightData, my_squares) {
    for (
      let square_index = 0;
      square_index < Object.keys(my_squares).length;
      square_index++
    ) {
      // loop through the squares
      my_squares[square_index].isInHighlight = false;
    }

    for (let index = 0; index < Object.keys(my_highlightData).length; index++) {
      //loop through the highlights
      let my_highlight = my_highlightData[index];

      //if a square is highlighted
      if (my_highlight.isHighlighted == true) {
        for (
          let square_index = 0;
          square_index < Object.keys(my_squares).length;
          square_index++
        ) {
          // loop through the squares
          let square = { ...my_squares[square_index] };
          const check_x = inRange(
            square.col,
            my_highlight.x,
            my_highlight.x + my_highlight.w - 1
          );
          const check_y = inRange(
            square.row,
            my_highlight.y,
            my_highlight.y + my_highlight.h - 1
          );
          //if it is in the range set the highlight
          if (check_x && check_y) {
            square.isInHighlight = true;
          } else {
            //  square.isInHighlight = false;
          }
          //update the square
          my_squares[square_index] = square;
        }
      }
    }
    return my_squares;
  }

  function inRange(number, min, max) {
    return number >= min && number <= max;
  }

  function handleClick(square_id) {
    let copy_squares = { ...state.squareData };

    let copy_highlightData = { ...state.highlightData };

    //race condition?

    function setParentHighlight(working_highlightData, square) {
      for (
        let index = 0;
        index < Object.keys(working_highlightData).length;
        index++
      ) {
        const highlight = working_highlightData[index];
        const check_x = inRange(
          square.col,
          highlight.x,
          highlight.x + highlight.w - 1
        );

        const check_y = inRange(
          square.row,
          highlight.y,
          highlight.y + highlight.h - 1
        );
        if (check_x && check_y) {
          highlight.isHighlighted = true;
        } else {
          highlight.isHighlighted = false;
        }

        working_highlightData[index] = highlight;
      }

      return working_highlightData;
    }

    //a click comes in
    //we look through the grid array to find the matching grid square

    for (let index = 0; index < Object.keys(copy_squares).length; index++) {
      let element = copy_squares[index];
      if (square_id == element.id) {
        element.isSelected = true;
        copy_highlightData = setParentHighlight(copy_highlightData, element);
        // call the highlight relevant squares here
      } else {
        element.isSelected = false;
      }
      copy_squares[index] = element;
    }
    const squares_with_in_highlights = setInHighlight(
      { ...copy_highlightData },
      { ...copy_squares }
    );
    setState({
      squareData: squares_with_in_highlights,
      highlightData: copy_highlightData,
    });
  }

  //Key press suppport________________
  //https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
  const handleUserKeyPress = useCallback((event) => {
    let copy_squares = { ...state.squareData };
    let copy_highlightData = { ...state.highlightData };
    if ("1234567890".includes(event.key)) {
      for (
        let square_index = 0;
        square_index < Object.keys(copy_squares).length;
        square_index++
      ) {
        let x = copy_squares[square_index];
        if (x.isSelected == true) {
          x.value = event.key;
        }
        copy_squares[square_index] = x;
      }
    } else {
      for (
        let square_index = 0;
        square_index < Object.keys(copy_squares).length;
        square_index++
      ) {
        let x = copy_squares[square_index];
        if (x.isSelected == true) {
          x.value = "";
        }
        copy_squares[square_index] = x;
      }
    }

    copy_squares = setInHighlight(copy_highlightData, copy_squares);

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
    let copy_squares = { ...state.squareData };
    let copy_highlightData = { ...state.highlightData };

    for (
      let square_index = 0;
      square_index < Object.keys(copy_squares).length;
      square_index++
    ) {
      let x = copy_squares[square_index];
      if (x.isSelected == true) {
        x.isSelected = false;
      }
      copy_squares[square_index] = x;
    }

    for (
      let index = 0;
      index < Object.keys(copy_highlightData).length;
      index++
    ) {
      copy_highlightData[index].isHighlighted = false;
    }

    setState({ squareData: copy_squares, highlightData: copy_highlightData });
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

  // https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      squareData: intializeSquareData(squareDataTest1),
      highlightData: intializeHighlightData(highlightDataTest1),
      keypress: "",
      layoutSquares: intializeLayoutSquares(squareDataTest1),
      layoutHighlights: intializeLayoutHighlights(highlightDataTest1),
      showSolution: showSolution,
    }
  );

  function handleClearBoard() {
    setState({
      squareData: [],
      layoutHighlights: [],
      layoutSquares: [],
      hightlightData: [],
    });
  }

  function handleSetState1() {
    const square_data_init = intializeSquareData(squareDataTest1);
    setState({
      squareData: intializeSquareData(squareDataTest1),
      highlightData: intializeHighlightData(highlightDataTest1),
      keypress: "",
      layoutSquares: intializeLayoutSquares(squareDataTest1),
      layoutHighlights: intializeLayoutHighlights(highlightDataTest1),
    });

    handleResetBoardValues({ ...square_data_init }, squareDataTest1);
  }
  function handleSetState2() {
    // make state 2 match
    const square_data_init = intializeSquareData(squareDataTest2);
    setState({
      squareData: square_data_init,
      highlightData: intializeHighlightData(highlightDataTest2),
      keypress: "",
      layoutSquares: intializeLayoutSquares(squareDataTest2),
      layoutHighlights: intializeLayoutHighlights(highlightDataTest2),
    });

    handleResetBoardValues({ ...square_data_init }, squareDataTest2);
  }

  function handleResetBoardValues(copy_squares, JSONData) {
    console.log(JSONData);
    for (
      let square_index = 0;
      square_index < Object.keys(copy_squares).length;
      square_index++
    ) {
      // loop through the squares
      copy_squares[square_index].value = null;

      copy_squares[square_index].value_start =
        JSONData[square_index].value_start;

      copy_squares[square_index].value_correct =
        JSONData[square_index].value_correct;

      copy_squares[square_index].isSelected = false;
      copy_squares[square_index].isInHighlight = false;
      copy_squares[square_index].showSolution = false;
    }
    setState({ squareData: copy_squares });
  }

  function handleShowSolution() {
    setState({ showSolution: !state.showSolution });
  }

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
          {
            <MyFirstGridFunctional
              squareData={state.squareData}
              highlightData={state.highlightData}
              layoutSquares={state.layoutSquares}
              layoutHighlights={state.layoutHighlights}
              showSolution={state.showSolution} //remove this later
            />
          }
        </div>
        <Button onClick={handleSetState1}>set state 1</Button>
        <Button onClick={handleSetState2}>set state 2</Button>
        <Button onClick={handleClearBoard}>clear board</Button>
        <Button onClick={handleShowSolution}>Show Solutions</Button>
        <Button onClick={handleResetBoardValues}>Clear Board Values</Button>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
