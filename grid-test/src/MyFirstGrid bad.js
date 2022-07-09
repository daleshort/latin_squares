import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGrid.css";

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
    className: "layout",
    isDraggable: false,
    isResizable: false,
    items: 16,
    cols: 4,
    rowHeight: 30,
    onLayoutChange: function () {},
    board_width: 4,
  };

  constructor(props) {
    super(props);

    this.state = { layout: [], squares: [], keypress: "" };

    this.handleClick = this.handleClick.bind(this);
    // this.loopButtons = this.loopButtons.bind(this);

    const copy_squares = this.state.squares; //copy entire square class array
    for (let i = 0; i < this.props.board_width ** 2; i++) {
      const square = new square_data_class();
      square.value = i;
      square.id = i;
      square.square_click_handler = this.handleClick;
      copy_squares.push(square);
    }
    this.setState({ squares: copy_squares });
    this.setRowAndColumn();

    this.setState({ layout: this.generateLayout() });
  }

  handleClick(i) {
    console.log("click from a square:" + i);
  }

  keydownHandler = (event) => {
    if ("1234567890".includes(event.key)) {
      console.log("key press:" + event.key);
    }
  };

  setRowAndColumn() {
    const copy_squares = this.state.squares.slice(); //copy entire square class array
    var row_count = 0;
    var col_count = 0;

    for (let i = 0; i < copy_squares.length; i++) {
      copy_squares[i].row = row_count;
      copy_squares[i].col = col_count;
      col_count++;

      if (col_count >= this.props.board_width) {
        col_count = 0;
        row_count++;
      }
    }

    this.setState({ squares: copy_squares });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function (i) {
      return (
        <div key={i} className="box">
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  getSquare() {
    return this.state.squares;
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function (item, i) {
      return {
        x: i % 4,
        y: Math.floor(i / 4),
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
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then((fn) => fn.default(NoDraggingLayout));
// }
