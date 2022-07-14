import React, { useReducer, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./MyFirstGridFunctional.css";
import Grid from "@react-css/grid";

let squareDataTest1 = require("./test_square_data.json");
let squareDataTest2 = require("./test_square_data2.json");
let highlightDataTest1 = require("./test_highlight_data.json");
let highlightDataTest2 = require("./test_highlight_data2.json"); // same file right now

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

  // function setInHighlight(my_highlightData, my_squares) {
  //   for (
  //     let square_index = 0;
  //     square_index < Object.keys(my_squares).length;
  //     square_index++
  //   ) {
  //     // loop through the squares
  //     my_squares[square_index].isInHighlight = false;
  //   }

  //   for (let index = 0; index < Object.keys(my_highlightData).length; index++) {
  //     //loop through the highlights
  //     let my_highlight = my_highlightData[index];

  //     //if a square is highlighted
  //     if (my_highlight.isHighlighted == true) {
  //       for (
  //         let square_index = 0;
  //         square_index < Object.keys(my_squares).length;
  //         square_index++
  //       ) {
  //         // loop through the squares
  //         let square = { ...my_squares[square_index] };
  //         const check_x = inRange(
  //           square.col,
  //           my_highlight.x,
  //           my_highlight.x + my_highlight.w - 1
  //         );
  //         const check_y = inRange(
  //           square.row,
  //           my_highlight.y,
  //           my_highlight.y + my_highlight.h - 1
  //         );
  //         //if it is in the range set the highlight
  //         if (check_x && check_y) {
  //           square.isInHighlight = true;
  //         } else {
  //           //  square.isInHighlight = false;
  //         }
  //         //update the square
  //         my_squares[square_index] = square;
  //       }
  //     }
  //   }
  //   return my_squares;
  // }

  function inRange(number, min, max) {
    return number >= min && number <= max;
  }

  function handleClick(square_id) {
    let copy_id_array = state.id_array.concat();
    let copy_row_array = state.row_array.concat();
    let copy_col_array = state.col_array.concat();
    let copy_isSelected_array = state.isSelected_array.concat();
    let copy_isInHighlight_array = state.isInHighlight_array.concat();
    let copy_highlight_x = state.highlight_x.concat();
    let copy_highlight_y = state.highlight_y.concat();
    let copy_highlight_w = state.highlight_w.concat();
    let copy_highlight_h = state.highlight_h.concat();
    let copy_highlight_isHighlighted = state.highlight_isHighlighted.concat();

    console.log("click from square", square_id);
    console.log("state of isSelected Array in", copy_isSelected_array);

    //a click comes in
    //we look through the grid array to find the matching grid square

    for (let index = 0; index < copy_id_array.length; index++) {
      console.log("if square id ", square_id, "equals :", copy_id_array[index]);
      if (square_id == copy_id_array[index]) {
        copy_isSelected_array[index] = true;
        console.log("made it into the loop");

        const x_square = copy_col_array[index];
        const y_square = copy_row_array[index];

        copy_highlight_x.map((x, index_highlight) => {
          const highlight_x = copy_highlight_x[index_highlight];
          const highlight_y = copy_highlight_y[index_highlight];
          const highlight_w = copy_highlight_w[index_highlight];
          const highlight_h = copy_highlight_h[index_highlight];

          const check_x = inRange(
            x_square,
            highlight_x,
            highlight_x + highlight_w - 1
          );

          const check_y = inRange(
            y_square,
            highlight_y,
            highlight_y + highlight_h - 1
          );
          if (check_x && check_y) {
            copy_highlight_isHighlighted[index_highlight] = true;
          } else {
            copy_highlight_isHighlighted[index_highlight] = false;
          }
        });
      } else {
        copy_isSelected_array[index] = false;
      }
    }
    //need to add highlight the other squares in the highlight here
    console.log("state of is selected out", copy_isSelected_array);
    setState({
      isSelected_array: copy_isSelected_array,
      //do not need to set ID array
    });
  }

  // Key press suppport________________
  // https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
  function handleUserKeyPress(event) {
    let copy_value_array = state.value_array.concat();
    let copy_isSelected_array = state.isSelected_array.concat();

    console.log("key press", event.key);
    console.log("state", state);
    copy_isSelected_array.map((element, index) => {
      console.log("index is", index);
      if (element == true) {
        if ("1234567890".includes(event.key)) {
          copy_value_array[index] = event.key;
        } else {
          copy_value_array[index] = "";
        }
      }
    });
    console.log("copy value array", copy_value_array);
    setState({
      value_array: copy_value_array,
      isSelected_array: copy_isSelected_array,
    });
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  function handleFocusAway(square) {
    let copy_isSelected_array = state.isSelected_array.concat();
    let copy_highlight_isHighlighted = state.highlight_isHighlighted.concat();

    copy_isSelected_array.fill(false);
    copy_highlight_isHighlighted.fill(false);

    setState({
      isSelected_array: copy_isSelected_array,
      highlight_isHighlighted: copy_highlight_isHighlighted,
    });
  }

  //STATE MANAGEMENT
  // ______________________

  //STATE MANAGEMENT
  // ______________________

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      value_array: [],
      value_correct_array: [],
      value_start_array: [],
      id_array: [],
      row_array: [],
      col_array: [],
      isSelected_array: [],
      isInHighlight_array: [],
      highlight_x: [],
      highlight_y: [],
      highlight_w: [],
      highlight_h: [],
      highlight_id: [],
      highlight_type: [],
      highlight_isHighlighted: [],
      square_click_handler: null,
      handleFocusAway: null,
      showSolution: false,
    }
  );

  useEffect(() => {
    intializeSquareData(squareDataTest1);
    intializeHighlightData(highlightDataTest1);
  }, []);

  function intializeSquareData(JsonData) {
    let value_array = new Array();
    let value_correct_array = new Array();
    let value_start_array = new Array();
    let id_array = new Array();
    let row_array = new Array();
    let col_array = new Array();
    let isSelected_array = new Array();
    let isInHighlight_array = new Array();

    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      console.log("element is ", element);
      value_array.push(element.value);
      value_correct_array.push(element.value_correct);
      value_start_array.push(element.value_start);
      id_array.push(element.id);
      row_array.push(element.row);
      col_array.push(element.col);
      isSelected_array.push(false);
      isInHighlight_array.push(false);
    }
    console.log("squareData state", isSelected_array);
    setState({
      value_array: value_array,
      value_correct_array: value_correct_array,
      value_start_array: value_start_array,
      id_array: id_array,
      col_array: col_array,
      row_array: row_array,
      isSelected_array: isSelected_array,
      isInHighlight_array: isInHighlight_array,
    });
  }

  function intializeHighlightData(JsonData) {
    let highlight_x = new Array();
    let highlight_y = new Array();
    let highlight_w = new Array();
    let highlight_h = new Array();
    let highlight_id = new Array();
    let highlight_type = new Array();
    let highlight_isHighlighted = new Array();

    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];
      highlight_x.push(element.x);
      highlight_y.push(element.y);
      highlight_w.push(element.w);
      highlight_h.push(element.h);
      highlight_id.push(element.id);
      highlight_type.push(element.type);
      highlight_isHighlighted.push(false);
    }
    setState({
      highlight_x: highlight_x,
      highlight_y: highlight_y,
      highlight_w: highlight_w,
      highlight_h: highlight_h,
      highlight_id: highlight_id,
      highlight_type: highlight_type,
      highlight_isHighlighted: highlight_isHighlighted,
    });
  }

  // https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re

  // function handleClearBoard() {
  //   let copy_state = { ...state };

  //   copy_state.squareData = [];
  //   copy_state.highlightData = [];
  //   setState(copy_state);
  // }

  function handleSetState1() {
    intializeSquareData(squareDataTest1);
    intializeHighlightData(highlightDataTest1);
  }

  function handleSetState2() {
    intializeSquareData(squareDataTest2);
    intializeHighlightData(highlightDataTest2);
  }

  function handleResetBoardValues() {
    let copy_squares = state.value_array.slice().fill(null);

    setState({ value_array: copy_squares });
  }

  function handleShowSolution() {
    setState({ showSolution: !state.showSolution });
  }

  function generateHighlightDOM() {
    if (state.highlight_id.length != 0) {
      const highlightDOM = [];
      for (let index = 0; index < state.highlight_id.length; index++) {
        const className =
          "box-" +
          state.highlight_type[index] +
          (state.highlight_isHighlighted[index] == true ? "-highlight" : "");

        highlightDOM.push(
          <Grid.Item
            key={state.highlight_id[index].toString()}
            columnStart={state.highlight_x[index] + 1}
            columnEnd={state.highlight_x[index] + state.highlight_w[index] + 1}
            rowStart={state.highlight_y[index] + 1}
            rowEnd={state.highlight_y[index] + state.highlight_h[index] + 1}
          >
            <div className={className} />
          </Grid.Item>
        );
      }
      return highlightDOM;
    }
  }

  function renderButtonValue(i) {
    if (state.value_start_array[i] != null) {
      return state.value_start_array[i];
    } else if (state.showSolution == true) {
      return state.value_correct_array[i];
    } else {
      return state.value_array[i];
    }
  }

  function setButtonClassName(i) {
    if (state.value_start_array[i] !== null) {
      return "gridbox-locked";
    } else if (state.showSolution === true) {
      if (state.value_array[i] == state.value_correct_array[i]) {
        return "gridbox-solutionCorrect";
      } else {
        return "gridbox-solutionNotCorrect";
      }
    } else if (state.isSelected_array[i] == true) {
      return "gridbox";
    } else if (state.isInHighlight_array[i] == true) {
      return "gridbox-isInHighlight";
    } else {
      return "gridbox";
    }
  }

  function generateDOM() {
    const list_items = [];
    for (let i = 0; i < state.id_array.length; i++) {
      list_items.push(
        <Grid.Item
          key={state.id_array[i].toString() + "gridcontainer"}
          columnStart={state.col_array[i] + 1}
          columnEnd={state.col_array[i] + 2}
          rowStart={state.row_array[i] + 1}
          rowEnd={state.row_array[i] + 2}
        >
          <button
            className={setButtonClassName(i)}
            onFocus={() => {
              handleClick(state.id_array[i]);
            }}
            onClick={() => {
              handleClick(state.id_array[i]);
            }}
            onBlur={() => {
              handleFocusAway(state.id_array[i]);
            }}
            key={state.id_array[i] + "buttonBase"}
          >
            {renderButtonValue(i)}
          </button>
        </Grid.Item>
      );
    }
    return list_items;
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
            <Grid
              rows="repeat(9,auto)" //sets grid-template-rows
              columns="repeat(9,auto)"
              gap="0"
            >
              {generateHighlightDOM()}
              {generateDOM()}
            </Grid>
          }
        </div>
        <button onClick={handleSetState1}>set state 1</button>
        <button onClick={handleSetState2}>set state 2</button>
        {/* <button onClick={handleClearBoard}>clear board</button>*/}
        <button onClick={handleShowSolution}>Show Solutions</button>
        <button onClick={handleResetBoardValues}>Clear Board Values</button>
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
