import React, { useEffect, useCallback, useReducer } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGridFunctional.css";
import ButtonFunction from "./ButtonFunction.js";

/* 

@gamemanager[Square Data] from some json -> @grid layout [square data]
 -> fill in some blanks of things like the click handler -> this becomes my state
 -> when the board renders -> set the squares with the right state - > @Button display a squares state

should work like: Game manager gets a board from JSON.  It then fills in the blanks of the squares 
(like saying what callbacks to use).  it then generates a layout template, this all gets passed down to the board

*/

const ReactGridLayout = WidthProvider(RGL);

export default function MyFirstGridFunctional({
  //start layout specific properties
  className = "gridlayout",
  isDraggable = false,
  isResizable = false,
  cols = 9, // this makes a 9x9 grid for us to draw on
  rowHeight = 40, //This is the row height.  Has to be adjusted to make square
  onLayoutChange = function () {},
  margin = [0, 0],
  autoSize = false,
  //start game properties
  squareData, // data for each square
  highlightData, // highlight data
  layoutSquares,
  layoutHighlights,
  showSolution = false, //flag that needs to go away for if solutions should be shown
}) {
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

  //RF does this need to be moved up? I think not
  function generateDOM() {
    // console.log("state square data in DOM", squares);

    var number_items = Object.keys(squareData).length;
    const list_items = [];
    for (let i = 0; i < number_items; i++)
      list_items.push(
        <ButtonFunction
          my_key={squareData[i].id}
          value={squareData[i].value}
          key={squareData[i].id}
          my_row={squareData[i].row}
          my_col={squareData[i].col}
          isSelected={squareData[i].isSelected}
          isInHighlight={squareData[i].isInHighlight}
          value_start={squareData[i].value_start}
          value_correct={squareData[i].value_correct}
          onClickFunction={squareData[i].square_click_handler}
          handleFocusAwayFunction={squareData[i].handleFocusAway}
          className="gridbox"
          showSolution={showSolution}
        />
      );
    return list_items;
  }

  function generateHighlightDOM() {
    if (Object.keys(layoutHighlights).length == 0) {
    } else {
      const highlightDOM = [];
      for (let index = 0; index < Object.keys(highlightData).length; index++) {
        const element = highlightData[index];
        const className =
          "box-" +
          element.type +
          (element.isHighlighted == true ? "-highlight" : "");
        highlightDOM.push(
          <div className={className} key={element.id.toString()} />
        );
      }
      return highlightDOM;
    }
  }

  //we could watch the state of layout, and if layout is empty we just kill the dom with it

  return (
    <ReactGridLayout
      layout={layoutSquares.concat(layoutHighlights)}
      onLayoutChange={onLayoutChange}
      allowOverlap={true}
      className="gridlayout"
      isDraggable={isDraggable}
      isResizable={isResizable}
      cols={cols}
      rowHeight={rowHeight}
      margin={margin}
      autoSize={autoSize}
      showSolution={showSolution}
    >
      {generateHighlightDOM()}
      {generateDOM()}
    </ReactGridLayout>
  );
}

//     //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined
//   }
