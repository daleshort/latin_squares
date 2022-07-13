import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGrid.css";
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

export default class MyFirstGrid extends React.Component {
  static defaultProps = {
    className: "gridlayout",
    isDraggable: false,
    isResizable: false,
    cols: 9,
    rowHeight: 40,
    onLayoutChange: function () {},
    margin: [0, 0],
    autoSize: false,
    testing: false,
    testing_grid_qty: 16,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocusAway = this.handleFocusAway.bind(this);

    console.log("json test data loaded", this.props.squareData);
    console.log("highlight test data loaded: ", this.props.highlightData);

    const square_data_init = this.initalizeSquareData();
    //initalize the layout for the hightlights and then the grid
    console.log("square data:", square_data_init);
    const layout = this.generateLayoutHighlights(square_data_init).concat(
      this.generateLayoutGrid(square_data_init)
    );

    console.log("layout", layout);
    this.state = { layout, squares: square_data_init, keypress: "" };
  }

  initalizeSquareData() {
    let filledSquares = new Array();
    if (this.props.testing == true) {
      //fill the square state with empty squares the dimensions of the board
      const copy_squares = [];
      for (let i = 0; i < this.props.testing_grid_qty; i++) {
        // for (let i = 0; i < this.props.testing_grid_qty; i++) {
        const square = new square_data_class();
        square.value = null;
        square.id = i;
        square.square_click_handler = this.handleClick;
        square.handleFocusAway = this.handleFocusAway;
        copy_squares.push(square);
      }
      //set the row and column properties automatically
      filledSquares = this.setRowAndColumn(copy_squares);
    } else {
      for (
        let index = 0;
        index < Object.keys(this.props.squareData).length;
        index++
      ) {
        const element = this.props.squareData[index];
        const square = new square_data_class();
        square.value = element.value; //current value of square
        square.value_correct = element.value_correct; //answer
        square.value_start = element.value_start; // value prepopulated on the board.  if set square will not be editable
        square.id = element.id;
        square.row = element.row;
        square.col = element.col;

        square.square_click_handler = this.handleClick;
        square.handleFocusAway = this.handleFocusAway;
        filledSquares.push(square);
      }
    }
    return filledSquares;
  }

  setRowAndColumn(copy_squares) {
    var row_count = 0;
    var col_count = 0;

    for (let i = 0; i < Object.keys(copy_squares).length; i++) {
      copy_squares[i].row = row_count;
      copy_squares[i].col = col_count;
      col_count++;

      if (col_count >= this.props.cols) {
        col_count = 0;
        row_count++;
      }
    }

    return copy_squares;
  }

  handleFocusAway(square_reporting) {
    console.log("focus lost: ", square_reporting);

    const copy_squares = this.state.squares.slice();
    copy_squares.map((x, i) => {
      if (x.isSelected == true) {
        x.isSelected = false;
      }
      return x;
    });
    this.setState({ squares: copy_squares });
  }

  keydownHandler = (event) => {
    const copy_squares = this.state.squares.slice();
    try {
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
      this.setState({ squares: copy_squares });
    } catch (error) {
      console.log("error accessing state");
    }
  };

  generateLayoutGrid(square_data) {
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

  generateLayoutHighlights(square_data) {
    var highlightLayout = [];
    for (
      let index = 0;
      index < Object.keys(this.props.highlightData).length;
      index++
    ) {
      const element = this.props.highlightData[index];

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

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
  }

  // shouldComponentUpdate() {
  //   // const square_data_init = this.initalizeSquareData();
  //   // const layout = this.generateLayoutHighlights(square_data_init).concat(
  //   //   this.generateLayoutGrid(square_data_init)
  //   // );
  //   // this.setState({ layout: layout, squares: square_data_init });
  //   // return true;
  // }

  handleClick(i) {
    console.log("click from a square:" + i);
    const copy_squares = this.state.squares.slice(); //copy entire square class array
    copy_squares.map((x, i) => {
      x.isSelected = false;
      return x;
    });
    copy_squares[parseInt(i)].isSelected = true;
    this.setState({ squares: copy_squares });
  }

  generateDOM() {
    var number_items = Object.keys(this.state.squares).length;
    const list_items = [];

    for (let i = 0; i < number_items; i++)
      list_items.push(
        <ButtonFunction
          my_key={this.state.squares[i].id}
          value={this.state.squares[i].value}
          key={this.state.squares[i].id}
          my_row={this.state.squares[i].row}
          my_col={this.state.squares[i].col}
          isSelected={this.state.squares[i].isSelected}
          value_start={this.state.squares[i].value_start}
          value_correct={this.state.squares[i].value_correct}
          onClickFunction={this.state.squares[i].square_click_handler}
          handleFocusAway={this.state.squares[i].handleFocusAway}
          className="gridbox"
        />
      );
    console.log("dom with highlight", list_items);
    return list_items;
  }

  generateHighlightDOM() {
    const highlightDOM = [];
    for (
      let index = 0;
      index < Object.keys(this.props.highlightData).length;
      index++
    ) {
      const element = this.props.highlightData[index];

      highlightDOM.push(
        <div className="boxHighlight" key={element.id.toString()} />
      );
    }
    console.log("highlight DOM", highlightDOM);
    return highlightDOM;
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        allowOverlap={true}
        {...this.props}
      >
        {this.generateHighlightDOM()}
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
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
