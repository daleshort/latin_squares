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

export default class MyFirstGrid extends React.PureComponent {
  static defaultProps = {
    className: "gridlayout",
    isDraggable: false,
    isResizable: false,
    cols: 9,
    rowHeight: 40,
    onLayoutChange: function () {},
    margin: [0, 0],
    autoSize: false,
    input_squares: [],
    testing: false,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocusAway = this.handleFocusAway.bind(this);

    const square_data = this.initalizeSquareData();
    //initalize the layout for the hightlights and then the grid
    console.log("square data:", square_data);
    const layout = this.generateLayoutHighlights(square_data).concat(
      this.generateLayoutGrid(square_data)
    );

    console.log("layout", layout);
    this.state = { layout, squares: square_data, keypress: "" };
  }

  initalizeSquareData() {
    let filledSquares = new Array();
    if (this.props.testing == true) {
      //fill the square state with empty squares the dimensions of the board
      const copy_squares = [];
      for (let i = 0; i < this.props.cols ** 2; i++) {
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
        i: i.toString(),
      };
    });
  }

  generateLayoutHighlights(square_data) {
    var number_items = Object.keys(square_data).length;
    const highlightKeyStart = number_items;

    return [
      {
        x: 1,
        y: 1,
        w: 3,
        h: 3,
        i: highlightKeyStart.toString(),
      },
    ];
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
  }

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
    var number_items = this.props.cols ** 2;
    const list_items = [];
    list_items.push(this.generateHighlightDOM());

    for (let i = 0; i < number_items; i++)
      list_items.push(
        <ButtonFunction
          my_key={this.state.squares[i].id}
          value={this.state.squares[i].value}
          key={this.state.squares[i].id}
          my_row={this.state.squares[i].row}
          my_col={this.state.squares[i].col}
          isSelected={this.state.squares[i].isSelected}
          onClickFunction={this.state.squares[i].square_click_handler}
          handleFocusAway={this.state.squares[i].handleFocusAway}
          className="gridbox"
        />
      );

    console.log("Dom generated", list_items);
    return list_items;
  }
  // generateDOM() {
  //   var number_items = this.props.cols ** 2;
  //   const list_items = [];
  //   for (let i = 0; i < number_items; i++)
  //     list_items.push(
  //       <ButtonFunction
  //         my_key={i}
  //         key={this.state.squares[i].id}
  //         my_row={this.state.squares[i].row}
  //         my_col={this.state.squares[i].col}
  //         isSelected={this.state.squares[i].isSelected}
  //         onClickFunction={this.state.squares[i].square_click_handler}
  //         className="gridbox"
  //       >
  //         {" "}
  //         text{" "}
  //       </ButtonFunction>
  //     );

  //   list_items.push(this.addHighlightDOM());
  //   console.log("Dom generated", list_items);
  //   return list_items;
  // }

  generateHighlightDOM() {
    const highlightKeyStart = this.props.cols ** 2;

    return [
      <div className="boxHighlight" key={highlightKeyStart.toString()} />,
    ];
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
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
            <ReactGridLayout
              layout={this.state.layout}
              onLayoutChange={this.onLayoutChange}
              allowOverlap={true}
              {...this.props}
            >
              {this.generateDOM()}
            </ReactGridLayout>
          </div>
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
