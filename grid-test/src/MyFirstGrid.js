import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGrid.css";
import ButtonFunction from "./ButtonFunction.js";

const ReactGridLayout = WidthProvider(RGL);

class square_data_class {
  constructor() {
    const value = "";
    const id = "";
    const row = null;
    const col = null;
    const isSelected = false;
    const square_click_handler = null;
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
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayoutGrid().concat(
      this.generateLayoutHighlights()
    );
    console.log("layout", layout);
    this.state = { layout, squares: [], keypress: "" };
    this.handleClick = this.handleClick.bind(this);

    const copy_squares = this.state.squares; //copy entire square class array
    for (let i = 0; i < this.props.cols ** 2; i++) {
      const square = new square_data_class();
      square.value = i;
      square.id = i;
      square.square_click_handler = this.handleClick;
      copy_squares.push(square);
    }
    this.setState({ squares: copy_squares });
    this.setRowAndColumn();
  }

  keydownHandler = (event) => {
    if ("1234567890".includes(event.key)) {
      console.log("key press:" + event.key);
    }
  };

  generateLayoutHighlights() {
    const highlightKeyStart = this.props.cols ** 2;

    return {
      x: 1,
      y: 1,
      w: 3,
      h: 3,
      i: highlightKeyStart.toString(),
    };
  }

  setRowAndColumn() {
    const copy_squares = this.state.squares.slice(); //copy entire square class array
    var row_count = 0;
    var col_count = 0;

    for (let i = 0; i < copy_squares.length; i++) {
      copy_squares[i].row = row_count;
      copy_squares[i].col = col_count;
      col_count++;

      if (col_count >= this.props.cols) {
        col_count = 0;
        row_count++;
      }
    }

    this.setState({ squares: copy_squares });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
  }

  handleClick(i) {
    console.log("click from a square:" + i);
  }

  generateDOM() {
    var number_items = this.props.cols ** 2;
    const list_items = [];
    for (let i = 0; i < number_items; i++)
      list_items.push(
        <ButtonFunction
          my_key={i}
          key={this.state.squares[i].id}
          my_row={this.state.squares[i].row}
          my_col={this.state.squares[i].col}
          onClickFunction={this.state.squares[i].square_click_handler}
          className="gridbox"
        >
          {" "}
          text{" "}
        </ButtonFunction>
      );

    list_items.push(this.addHighlightDOM());
    console.log("Dom generated", list_items);
    return list_items;
  }

  addHighlightDOM() {
    const highlightKeyStart = this.props.cols ** 2;

    return [
      <div className="boxHighlight" key={highlightKeyStart.toString()}>
        my box
      </div>,
    ];
  }

  generateLayoutGrid() {
    const p = this.props;
    var number_items = p.cols ** 2;
    return _.map(new Array(number_items), function (item, i) {
      return {
        x: i % p.cols,
        y: Math.floor(i / p.cols),
        w: 1,
        h: 1,
        i: i.toString(),
      };
    });
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
