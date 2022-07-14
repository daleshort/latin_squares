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
