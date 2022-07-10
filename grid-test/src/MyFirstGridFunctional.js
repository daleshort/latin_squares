import React, { useState, useEffect } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGridFunctional.css";
import ButtonFunction from "./ButtonFunction.js";

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
  testing_grid_qty = 16,
  squareData,
  highlightData,
}) {
  console.log("json test data loaded", squareData);
  console.log("highlight test data loaded: ", highlightData);

  //initialize square data
  const [square_data, updateSquareData] = useState(
    initalizeSquareData({ testing, testing_grid_qty, squareData })
  );
  console.log("square data:", square_data);

  const [highlight_data, updateHighlightData] = useState(highlightData);
  const [layout, updateLayout] = useState(
    generateLayoutHighlights(highlightData).concat(
      generateLayoutGrid(square_data)
    )
  );

  console.log("layout", layout);
  const [keypress, updateKeypress] = useState(" ");

  //end setup ______________________

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

  function initalizeSquareData(props) {
    let filledSquares = new Array();
    if (props.testing == true) {
      //fill the square state with empty squares the dimensions of the board
      const copy_squares = [];
      for (let i = 0; i < props.testing_grid_qty; i++) {
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
      for (
        let index = 0;
        index < Object.keys(props.squareData).length;
        index++
      ) {
        const element = props.squareData[index];
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

  //need to fix
  function handleFocusAway(square_reporting) {
    // console.log("focus lost: ", square_reporting);
    // const copy_squares = squares.slice();
    // copy_squares.map((x, i) => {
    //   if (x.isSelected == true) {
    //     x.isSelected = false;
    //   }
    //   return x;
    // });
    // updateSquareData(copy_squares);
  }

  //need to fix
  function keydownHandler(event) {
    // const copy_squares = squares.slice();
    // try {
    //   if ("1234567890".includes(event.key)) {
    //     console.log("key press:" + event.key);
    //     copy_squares.map((x, i) => {
    //       if (x.isSelected == true) {
    //         x.value = event.key;
    //       }
    //       return x;
    //     });
    //   } else {
    //     copy_squares.map((x, i) => {
    //       if (x.isSelected == true) {
    //         x.value = "";
    //       }
    //       return x;
    //     });
    //   }
    //   updateSquareData(copy_squares);
    // } catch (error) {
    //   console.log("error accessing state");
    // }
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

  function generateLayoutHighlights(props) {
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

  //need to fix
  // componentDidMount() {
  //   document.addEventListener("keydown", this.keydownHandler);
  // }

  //need to fix
  function handleClick(i) {
    // console.log("click from a square:" + i);
    // const copy_squares = squares.slice(); //copy entire square class array
    // copy_squares.map((x, i) => {
    //   x.isSelected = false;
    //   return x;
    // });
    // copy_squares[parseInt(i)].isSelected = true;
    // updateSquareData(copy_squares);
  }

  function generateDOM(squares) {
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
          handleFocusAway={squares[i].handleFocusAway}
          className="gridbox"
        />
      );
    console.log("dom with highlight", list_items);
    return list_items;
  }

  function generateHighlightDOM(highlight_data) {
    const highlightDOM = [];
    for (let index = 0; index < Object.keys(highlight_data).length; index++) {
      const element = highlight_data[index];

      highlightDOM.push(
        <div className="boxHighlight" key={element.id.toString()} />
      );
    }
    console.log("highlight DOM", highlightDOM);
    return highlightDOM;
  }

  // function onLayoutChange(layout) {
  //   props.onLayoutChange(layout);
  // }

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      allowOverlap={true}
      className="gridlayout"
      isDraggable={className}
      isResizable={isResizable}
      cols={cols}
      rowHeight={rowHeight}
      margin={margin}
      autoSize={autoSize}
    >
      {generateHighlightDOM(highlight_data)}
      {generateDOM(square_data)}
    </ReactGridLayout>
  );
}

// //from forum pst
// function Component({style, className, key, children, ...restOfProps}) {
//   return (
//     <div style={{ <styles you wish to apply> , ...style}} className={["classes you wish to apply", className].join(' ')} key={key} {...restOfProps}>
//        //Content goes here
//         {children}
//     </div>
//   );
// }

//from grid docs
// const ButtonFunction = React.forwardRef(({style, className, ...props}, ref) => {
//   return (
//     <div style={{ ...style}} className="gridbox" ref={ref}>
//       {/* Some other content */}
//     </div>
//   );
// }

// class MyButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onClick = this.onClick.bind(this);
//     // console.log("in constructor row is" + this.props.my_row);
//     //console.log("in constructor col is" + this.props.my_col);

//     this.state = { my_key: "", onClickFunction: null };

//     //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined
//   }

//   componentDidMount() {}

//   onClick() {
//     this.props.onClickFunction(this.props.my_key);
//   }

//   render() {
//     return (
//       <Button className="dokubox1" key={this.props.key} onClick={this.onClick}>
//         ({this.props.my_row},{this.props.my_col})
//       </Button>
//     );
//   }
// }

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then((fn) => fn.default(NoDraggingLayout));
// }
