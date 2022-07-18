import React, { useReducer, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./MyFirstGridFunctional.css";
import Grid from "@react-css/grid";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

//cp -r /home/react-projects/latin_squares/frontend/build/* /var/www/html/sudokuapp

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

  function inRange(number, min, max) {
    return number >= min && number <= max;
  }

  function handleClick(square_id) {
    let copy_value_array = state.value_array;
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
    let copy_hints = new Array();
    // intialize in highlight array to false
    copy_isInHighlight_array.fill(false);

    //a click comes in
    //we look through the grid array to find the matching grid square

    for (let index = 0; index < copy_id_array.length; index++) {
      //if the id of the square clicked matches the id at the index
      if (square_id == copy_id_array[index]) {
        copy_isSelected_array[index] = true;

        //get the indexes of everything with the same row
        const same_row_indices = [];
        let same_row_index = state.row_array.indexOf(state.row_array[index]);
        while (same_row_index != -1) {
          same_row_indices.push(same_row_index);
          same_row_index = state.row_array.indexOf(
            state.row_array[index],
            same_row_index + 1
          );
        }

        const same_col_indices = [];
        let same_col_index = state.col_array.indexOf(state.col_array[index]);
        while (same_col_index != -1) {
          same_col_indices.push(same_col_index);
          same_col_index = state.col_array.indexOf(
            state.col_array[index],
            same_col_index + 1
          );
        }

        //concat onto copy hints any values that match the
        //test of having an index that matches the list of indicies
        copy_hints = copy_hints.concat(
          copy_value_array
            .map((x, index_square_test) => {
              if (
                same_row_indices.includes(index_square_test) ||
                same_col_indices.includes(index_square_test)
              ) {
                // if the index is in the list
                if (x != null) {
                  return x.toString();
                } else if (state.value_start_array[index_square_test] != null) {
                  return state.value_start_array[index_square_test].toString();
                } else {
                  return null;
                }
              }
            })
            .filter((value) => value != null)
        );

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

            //map across the is in highlight array testing every square each element
            //for if it is in the highlight range
            copy_isInHighlight_array = copy_isInHighlight_array.map(
              (element, i) => {
                const test_x = copy_col_array[i];
                const test_y = copy_row_array[i];

                const square_is_in_x_highlight =
                  test_x >= highlight_x &&
                  test_x <= highlight_x + highlight_w - 1;

                const square_is_in_y_highlight =
                  test_y >= highlight_y &&
                  test_y <= highlight_y + highlight_h - 1;

                if (square_is_in_x_highlight && square_is_in_y_highlight) {
                  //if square is in highlight push the value to hints
                  let hint_val = null;

                  if (copy_value_array[i] != null) {
                    hint_val = copy_value_array[i];
                    //NEED TO ADD TO ABOVE GETTING VALUE STARTS IF VALUE IS NULL
                  } else if (state.value_start_array[i] != null) {
                    hint_val = state.value_start_array[i];
                  }

                  if (hint_val != null) {
                    copy_hints.push(
                      hint_val.toString()
                      // hint_val.toString() + "_" + index_highlight.toString()
                    );
                    //add create string here
                  }

                  return true;
                } else {
                  return element;
                }
              }
            );
          } else {
            copy_highlight_isHighlighted[index_highlight] = false;
          }
        });
      } else {
        copy_isSelected_array[index] = false;
      }
    }
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    copy_hints = copy_hints.filter(onlyUnique);

    console.log("copy hints at end of loop", copy_hints);

    setState({
      isSelected_array: copy_isSelected_array,
      textEntryisSelected_array: copy_isSelected_array, //this is a deliberate reuse of is selected array to set the text entry focus
      highlight_isHighlighted: copy_highlight_isHighlighted,
      isInHighlight_array: copy_isInHighlight_array,
      hints: copy_hints,
    });
  }

  // Key press suppport________________
  // https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
  function handleUserKeyPress(event) {
    let copy_value_array = state.value_array.concat();
    let copy_textEntryisSelected_array =
      state.textEntryisSelected_array.concat();
    console.log("key press is", event.key);
    copy_textEntryisSelected_array.map((element, index) => {
      if (element == true) {
        if (generatePossibleValues().includes(parseInt(event.key))) {
          copy_value_array[index] = event.key;
        } else {
          copy_value_array[index] = "";
        }
      }
    });

    setState({
      value_array: copy_value_array,
      //  isSelected_array: copy_isSelected_array,
    });
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  function handleFocusAway(square) {
    setState({
      textEntryisSelected_array: state.textEntryisSelected_array
        .concat()
        .fill(false),
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
      textEntryisSelected_array: [],
      isInHighlight_array: [],
      highlight_x: [],
      highlight_y: [],
      highlight_w: [],
      highlight_h: [],
      highlight_id: [],
      highlight_type: [],
      highlight_isHighlighted: [],
      hints: [],
      square_click_handler: null,
      handleFocusAway: null,
      showSolution: false,
      order: null,
      hardMode: false,
      puzzleType: "2x3",
      isLoading: false,
    }
  );

  useEffect(() => {
    intializeSquareData(squareDataTest1);
    intializeHighlightData(highlightDataTest1);
    console.log("highlight test data", highlightDataTest1);
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
    let textEntryisSelected = new Array();

    for (let index = 0; index < Object.keys(JsonData).length; index++) {
      const element = JsonData[index];

      value_array.push(element.value);
      value_correct_array.push(element.value_correct);
      value_start_array.push(element.value_start);
      id_array.push(element.id);
      row_array.push(element.row);
      col_array.push(element.col);
      isSelected_array.push(false);
      textEntryisSelected.push(false);
      isInHighlight_array.push(false);
    }

    setState({
      value_array: value_array,
      value_correct_array: value_correct_array,
      value_start_array: value_start_array,
      id_array: id_array,
      col_array: col_array,
      row_array: row_array,
      isSelected_array: isSelected_array,
      textEntryisSelected_array: textEntryisSelected,
      isInHighlight_array: isInHighlight_array,
      hints: [],
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
    let order = null;

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
    if (highlight_w.length >= 1) {
      order = highlight_w[0] * highlight_h[0];
      console.log("order", order);
    }

    setState({
      highlight_x: highlight_x,
      highlight_y: highlight_y,
      highlight_w: highlight_w,
      highlight_h: highlight_h,
      highlight_id: highlight_id,
      highlight_type: highlight_type,
      highlight_isHighlighted: highlight_isHighlighted,
      order: order,
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

  function handleSetHardMode() {
    setState({ hardMode: !state.hardMode });
  }

  function handleShowSolution() {
    setState({ showSolution: !state.showSolution });
  }

  function handleEasyButton(value) {
    let copy_value_array = state.value_array.concat();
    let copy_isSelected_array = state.isSelected_array.concat();
    copy_value_array[copy_isSelected_array.indexOf(true)] = value;
    setState({
      value_array: copy_value_array,
    });
  }

  function generatePossibleButtons() {
    let possibleValues = Array.from({ length: state.order }, (_, i) => i + 1);
    if (state.hardMode == false) {
      possibleValues = possibleValues.filter((x, i) => {
        if (!state.hints.includes(x.toString())) {
          return true;
        } else {
          return false;
        }
      });
    }
    return possibleValues.map((x, i) => {
      return (
        <button
          onClick={() => {
            handleEasyButton(x);
          }}
          className="easyButton"
          key={i + "pb"}
        >
          {x}
        </button>
      );
    });
  }

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  useEffect(() => {
    if (state.isLoading) {
      axios
        .get("http://localhost:8001/GetPuzzle")
        .then((res) => {
          console.log(res.data);
          intializeSquareData(res.data.squareData);
          intializeHighlightData(res.data.highlightData);
          setState({ isLoading: false });
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
          setState({ isLoading: false });
        });
    }
  }, [state.isLoading]);

  function handleLoadPuzzle(type) {
    setState({ isLoading: true });
  }

  function setPuzzleType(type) {
    setState({ puzzleType: type });
  }

  function generatePossibleValues() {
    let possibleValues = Array.from({ length: state.order }, (_, i) => i + 1);
    if (state.hardMode == false) {
      possibleValues = possibleValues.filter((x, i) => {
        if (!state.hints.includes(x.toString())) {
          return true;
        } else {
          return false;
        }
      });
    }
    console.log("possible buttons", possibleValues);
    return possibleValues;
  }

  const renderTooltipHardMode = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You will be able to enter any number in any square. No hints given.
    </Tooltip>
  );
  const renderTooltipClear = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reset all squares to empty.
    </Tooltip>
  );
  const renderTooltipLoad = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click the dropdown arrow to set puzzle dimensions. (2x3 currently only
      option)
    </Tooltip>
  );

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clear Cell
    </Tooltip>
  );

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
    let button_class_name = null;

    if (state.value_start_array[i] !== null) {
      button_class_name = "gridbox-locked";
    } else if (state.showSolution === true) {
      if (state.value_array[i] == state.value_correct_array[i]) {
        button_class_name = "gridbox-solutionCorrect";
      } else {
        button_class_name = "gridbox-solutionNotCorrect";
      }
    } else if (state.isSelected_array[i] == true) {
      button_class_name = "gridbox";
    } else if (state.isInHighlight_array[i] == true) {
      button_class_name = "gridbox-isInHighlight";
    } else {
      button_class_name = "gridbox";
    }
    return button_class_name;
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
              <a href="https://github.com/daleshort/latin_squares">About</a>
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
              Built in React by{" "}
              <a href="https://www2.cedarcrest.edu/academic/math/jmhammer/">
                James
              </a>{" "}
              and <a href="https://mechied.com/">Dale</a> at{" "}
              <a href="https://www.recurse.com/">The Recurse Center</a>
            </p>
          </div>
        </div>
        <div className="container" id="app">
          <div className="gameBox">
            <div className="gameBox-item" id="board">
              <div className="gameBox-item" id="game">
                {
                  <Grid
                    rows={
                      "repeat(" +
                      state.order +
                      ",calc(40vh/" +
                      state.order +
                      "))"
                    }
                    columns={
                      "repeat(" +
                      state.order +
                      ",calc(40vh/" +
                      state.order +
                      "))"
                    }
                    gap="0"
                  >
                    {generateHighlightDOM()}
                    {generateDOM()}
                  </Grid>
                }
              </div>
              <div className="gameBox-item" id="easyButtons">
                >{generatePossibleButtons()}
              </div>
            </div>
            <div className="gameBox-item">
              <div className="buttonBox">
                <div className="buttonBox-item">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltipDelete}
                  >
                    <Button
                      variant="danger"
                      size="lg"
                      id="delete-button"
                      onClick={() => {
                        handleEasyButton(null);
                      }}
                    >
                      &#68860;
                    </Button>
                  </OverlayTrigger>{" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltipHardMode}
                  >
                    <ToggleButton
                      onChange={handleSetHardMode}
                      checked={state.hardMode}
                      id="hardmode"
                      value={true}
                      type="checkbox"
                      variant={state.hardMode ? "dark" : "light"}
                      size="lg"
                    >
                      {" "}
                      {state.hardMode ? "Hard Mode" : "Easy Mode"}
                    </ToggleButton>
                  </OverlayTrigger>
                </div>
                <div className="buttonBox-item">
                  {" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltipClear}
                  >
                    <Button
                      variant="dark"
                      size="lg"
                      onClick={handleResetBoardValues}
                    >
                      Clear
                    </Button>
                  </OverlayTrigger>
                  {"  "}
                  <ToggleButton
                    onChange={handleShowSolution}
                    checked={state.showSolution}
                    id="showSolutionButton"
                    value={true}
                    type="checkbox"
                    variant="dark"
                    size="lg"
                  >
                    Show Solution
                  </ToggleButton>
                </div>
                <div className="buttonBox-item">
                  <Dropdown as={ButtonGroup}>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 100, hide: 200 }}
                      overlay={renderTooltipLoad}
                    >
                      <Button
                        bsPrefix="button-dark-custom"
                        size="lg"
                        onClick={() => {
                          handleLoadPuzzle(state.puzzleType);
                        }}
                      >
                        {state.isLoading ? "Loading..." : "Load New Puzzle"}
                      </Button>
                    </OverlayTrigger>

                    <Dropdown.Toggle
                      split
                      variant="dark"
                      size="lg"
                      id="dropdown-split-basic"
                    />

                    <Dropdown.Menu align="end" variant="dark" size="lg">
                      <Dropdown.Item
                        onClick={() => {
                          setPuzzleType("2x3");
                        }}
                        variant="custom"
                        id="2x3"
                        eventKey={"2x3"}
                        active={state.puzzleType == "2x3"}
                      >
                        2x3
                      </Dropdown.Item>
                      <Dropdown.Item
                        disabled
                        // NOTE CURRENTLY SET TO DISABLED
                        id="4x3"
                        eventKey={"4x3"}
                        onClick={() => {
                          setPuzzleType("4x3");
                        }}
                        active={state.puzzleType == "4x3"}
                      >
                        4x3
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="boxes">
        <div className="container">
          <div className="box-footer">
            <h2>
              <i className="fas fa-mobile"></i>How to play
            </h2>
            <p>
              Click on the board and type a number or click a number from the
              suggestion box. Enter any key to clear the box. A number can only
              be used once in a given row, column, primary (white) group, and
              secondary (orange) group. In easy mode, the suggestion box only
              contains values that meet the rules.
            </p>
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
