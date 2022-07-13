import React from "react";
import _ from "lodash";
import "./MyFirstGridFunctional.css";
import ButtonFunction from "./ButtonFunction.js";
import Grid from "@react-css/grid";
/* 

@gamemanager[Square Data] from some json -> @grid layout [square data]
 -> fill in some blanks of things like the click handler -> this becomes my state
 -> when the board renders -> set the squares with the right state - > @Button display a squares state

should work like: Game manager gets a board from JSON.  It then fills in the blanks of the squares 
(like saying what callbacks to use).  it then generates a layout template, this all gets passed down to the board

*/

export default function MyFirstGridFunctional({
  squareData, // data for each square
  highlightData, // highlight data
  showSolution = false, //flag that needs to go away for if solutions should be shown
}) {
  function generateDOM() {
    var number_items = Object.keys(squareData).length;
    const list_items = [];
    for (let i = 0; i < number_items; i++) {
      list_items.push(
        <Grid.Item key={squareData[i].id}>
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
            // onClickFunction={squareData[i].square_click_handler}
            // handleFocusAwayFunction={squareData[i].handleFocusAway}
            className="gridbox"
            showSolution={showSolution}
          />
        </Grid.Item>
      );
    }
    return list_items;
  }

  function generateHighlightDOM() {
    const highlightDOM = [];
    for (let index = 0; index < Object.keys(highlightData).length; index++) {
      const element = highlightData[index];
      const className =
        "box-" +
        element.type +
        (element.isHighlighted == true ? "-highlight" : "");
      highlightDOM.push(
        <Grid.Item key={element.id.toString()}>
          <div className={className} key={element.id.toString()} />
        </Grid.Item>
      );
    }
    return highlightDOM;
  }

  //we could watch the state of layout, and if layout is empty we just kill the dom with it

  return (
    <Grid
      rows="repeat(9,auto)" //sets grid-template-rows
      columns="repeat(9,auto)"
    >
      {generateHighlightDOM()}
      {generateDOM()}
    </Grid>
  );
}

//     //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined
//   }
