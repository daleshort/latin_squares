import React from "react";
import _ from "lodash";
import "./MyFirstGridFunctional.css";
import ButtonFunction from "./ButtonFunction.js";
import Grid from "@react-css/grid";

export default function MyFirstGridFunctional({
  squareData, // data for each square
  highlightData, // highlight data
  showSolution = false, //flag that needs to go away for if solutions should be shown
  loadCount = 0,
}) {
  function generateDOM() {
    var number_items = Object.keys(squareData).length;
    const list_items = [];
    for (let i = 0; i < number_items; i++) {
      list_items.push(
        <Grid.Item
          key={squareData[i].id + "%" + loadCount}
          columnStart={squareData[i].col + 1}
          columnEnd={squareData[i].col + 2}
          rowStart={squareData[i].row + 1}
          rowEnd={squareData[i].row + 2}
        >
          <ButtonFunction
            my_key={squareData[i].id}
            value={squareData[i].value}
            key={squareData[i].id + "buttonCust" + loadCount}
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
            loadCount={loadCount}
          />
        </Grid.Item>
      );
    }
    return list_items;
  }

  function generateHighlightDOM() {
    if (Object.keys(highlightData).length != 0) {
      const highlightDOM = [];
      for (let index = 0; index < Object.keys(highlightData).length; index++) {
        const element = highlightData[index];
        const className =
          "box-" +
          element.type +
          (element.isHighlighted == true ? "-highlight" : "");
        highlightDOM.push(
          <Grid.Item
            key={element.id.toString() + "%" + loadCount}
            columnStart={element.x + 1}
            columnEnd={element.x + element.w + 1}
            rowStart={element.y + 1}
            rowEnd={element.y + element.h + 1}
          >
            <div
              className={className}
              key={element.id.toString() + "highlight" + loadCount}
            />
          </Grid.Item>
        );
      }
      return highlightDOM;
    }
  }

  //we could watch the state of layout, and if layout is empty we just kill the dom with it

  return (
    <Grid
      rows="repeat(9,auto)" //sets grid-template-rows
      columns="repeat(9,auto)"
      gap="0"
    >
      {generateHighlightDOM()}
      {generateDOM()}
    </Grid>
  );
}

//     //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined
//   }
