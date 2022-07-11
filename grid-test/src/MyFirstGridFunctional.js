import React, { useEffect, useCallback, useReducer } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGridFunctional.css";
import ButtonFunction from "./ButtonFunction.js";

/* 

@gamemanager[Square Data] from some json -> @grid layout [square data]
 -> fill in some blanks of things like the click handler -> this becomes my state
 -> when the board renders -> set the squares with the right state - > @Button display a squares state





*/

const ReactGridLayout = WidthProvider(RGL);

class square_data_class {
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
  }
}

export default function MyFirstGridFunctional({
  className = "gridlayout",
  isDraggable = false,
  isResizable = false,
  cols = 9,
  rowHeight = 40,
  onLayoutChange = function () {},
  margin = [0, 0],
  autoSize = false,
  testing = false,
  testinggridqty = 16,
  squareData,
  highlightData,
  showSolution = false,
}) {
  console.log("json test data loaded", squareData);
  console.log("highlight test data loaded: ", highlightData);
  //https://dmitripavlutin.com/dont-overuse-react-usecallback/
  const handleFocusAway = useCallback((square) => {
    const copy_squares = state.square_data.slice();
    copy_squares.map((x, i) => {
      if (x.isSelected == true) {
        x.isSelected = false;
      }
      return x;
    });
    setState({ square_data: copy_squares });
  }, []);
  // https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re

  //initialize square data
  const initalsquaredata = initalizeSquareData(
    testing,
    testinggridqty,
    squareData
  );

  const layout = generateLayoutHighlights(highlightData).concat(
    generateLayoutGrid(initalsquaredata)
  );

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      square_data: initalsquaredata,
      keypress: "",
      layout: layout,
      highlightData: highlightData,
    }
  );

  console.log("layout", layout);

  //This is broken gotta figure out why
  // useEffect(() => {
  //   //initialize square data
  //   setState({
  //     square_data: initalizeSquareData(testing, testinggridqty, squareData),

  //     layout: generateLayoutHighlights(highlightData).concat(
  //       generateLayoutGrid(
  //         initalizeSquareData(testing, testinggridqty, squareData)
  //       )
  //     ),
  //   });
  // }, [squareData, highlightData]);

  //Key press suppport________________

  //document.addEventListener("keydown", keydownHandler);
  //https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
  const handleUserKeyPress = useCallback((event) => {
    const copy_squares = state.square_data.slice();
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
    setState({ square_data: copy_squares });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  //click support_________________________
  function handleClick(i) {
    const copy_squares = state.square_data.slice(); //copy entire square class array
    copy_squares.map((x, i) => {
      x.isSelected = false;
      return x;
    });
    copy_squares[parseInt(i)].isSelected = true;
    setState({ square_data: copy_squares });
  }

  //automatic filling of row and column (only used in testing)
  function setRowAndColumn(copy_squares, props) {
    var row_count = 0;
    var col_count = 0;

    for (let i = 0; i < Object.keys(copy_squares).length; i++) {
      copy_squares[i].row = row_count;
      copy_squares[i].col = col_count;
      col_count++;

      if (col_count >= props.cols) {
        col_count = 0;
        row_count++;
      }
    }

    return copy_squares;
  }

  function initalizeSquareData(testing, testinggridqty, squareData) {
    let filledSquares = new Array();
    if (testing == true) {
      //fill the square state with empty squares the dimensions of the board
      const copy_squares = [];
      for (let i = 0; i < testinggridqty; i++) {
        const square = new square_data_class();
        square.value = null;
        square.id = i;
        square.square_click_handler = handleClick;
        square.handleFocusAway = handleFocusAway;
        copy_squares.push(square);
      }
      //set the row and column properties automatically
      filledSquares = setRowAndColumn(copy_squares);
    } else {
      for (let index = 0; index < Object.keys(squareData).length; index++) {
        const element = squareData[index];
        const square = new square_data_class();
        square.value = element.value; //current value of square
        square.value_correct = element.value_correct; //answer
        square.value_start = element.value_start; // value prepopulated on the board.  if set square will not be editable
        square.id = element.id;
        square.row = element.row;
        square.col = element.col;

        square.square_click_handler = handleClick;
        square.handleFocusAway = handleFocusAway;
        filledSquares.push(square);
      }
    }
    return filledSquares;
  }

  function generateLayoutGrid(square_data) {
    var number_items = Object.keys(square_data).length;
    return _.map(new Array(number_items), function (item, i) {
      return {
        x: square_data[i].row,
        y: square_data[i].col,
        w: 1,
        h: 1,
        i: square_data[i].id.toString(),
      };
    });
  }

  function generateLayoutHighlights(highlightData) {
    var highlightLayout = [];
    for (let index = 0; index < Object.keys(highlightData).length; index++) {
      const element = highlightData[index];

      highlightLayout.push({
        x: parseInt(element.x),
        y: parseInt(element.y),
        w: parseInt(element.w),
        h: parseInt(element.h),
        i: element.id.toString(),
      });
    }
    return highlightLayout;
  }

  function generateDOM(squares) {
    // console.log("state square data in DOM", squares);

    var number_items = Object.keys(squares).length;
    const list_items = [];
    for (let i = 0; i < number_items; i++)
      list_items.push(
        <ButtonFunction
          my_key={squares[i].id}
          value={squares[i].value}
          key={squares[i].id}
          my_row={squares[i].row}
          my_col={squares[i].col}
          isSelected={squares[i].isSelected}
          value_start={squares[i].value_start}
          value_correct={squares[i].value_correct}
          onClickFunction={squares[i].square_click_handler}
          handleFocusAwayFunction={squares[i].handleFocusAway}
          className="gridbox"
          showSolution={showSolution}
        />
      );
    //  console.log("dom", list_items);
    return list_items;
  }

  function generateHighlightDOM(highlight_data) {
    const highlightDOM = [];
    //  console.log("high light state: ", state.highlightData);
    for (
      let index = 0;
      index < Object.keys(state.highlightData).length;
      index++
    ) {
      const element = state.highlightData[index];

      highlightDOM.push(
        <div className="boxHighlight" key={element.id.toString()} />
      );
    }

    return highlightDOM;
  }

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      allowOverlap={true}
      className="gridlayout"
      isDraggable={isDraggable}
      isResizable={isResizable}
      cols={cols}
      rowHeight={rowHeight}
      margin={margin}
      autoSize={autoSize}
    >
      {generateHighlightDOM(state.highlightData)}
      {generateDOM(state.square_data)}
    </ReactGridLayout>
  );
}

//     //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined
//   }
