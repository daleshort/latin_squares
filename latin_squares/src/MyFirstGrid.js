import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./MyFirstGrid.css";
import Button from "react-bootstrap/Button";

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
    cols: 4,
    rowHeight: 30,
    onLayoutChange: function () {},
    margin: [0, 0],
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

  generateLayoutHighlights() {
    const highlightKeyStart = this.props.cols ** 2;

    return {
      x: 1,
      y: 1,
      w: 10,
      h: 10,
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
        <div key={this.state.squares[i].id} className="gridbox">
          <span className="text">
            {this.state.squares[i].col} {this.state.squares[i].row}
          </span>
        </div>
      );

    list_items.push(this.addHighlightDOM());

    return list_items;
  }

  addHighlightDOM() {
    return [
      <div className="boxHighlight" key="16">
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
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        allowOverlap={true}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    // console.log("in constructor row is" + this.props.my_row);
    //console.log("in constructor col is" + this.props.my_col);

    this.state = { my_key: "", onClickFunction: null };

    //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined

    //this.generatePositionStyle = this.geneatePositionSyle.bind(this);
  }

  componentDidMount() {
    // this.setState({
  }

  onClick() {
    this.props.onClickFunction(this.props.my_key);
  }

  render() {
    return (
      <Button className="dokubox1" onClick={this.onClick}>
        ({this.props.my_row},{this.props.my_col})
      </Button>
    );
  }
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then((fn) => fn.default(NoDraggingLayout));
// }
