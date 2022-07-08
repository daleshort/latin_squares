import logo from "./logo.svg";
import "./ReactDoku.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

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

class ReactDoku extends React.Component {
  constructor(props) {
    super(props);

    const board_cell_count = parseInt(this.props.board_width) ** 2;
    console.log("cell count:" + board_cell_count);
    this.state = {
      squares: [],
      //      squares: new Array(board_cell_count).fill(new square_data_class()),
      keypress: "",
      board_width: 4,
    };
    // this.state = { squares: [new square_data_class()], keypress: "", board_width: 4, };
    this.handleClick = this.handleClick.bind(this);
    this.loopButtons = this.loopButtons.bind(this);

    const copy_squares = this.state.squares; //copy entire square class array
    for (let i = 0; i < this.state.board_width ** 2; i++) {
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

  handleClick(i) {
    console.log("click from a square:" + i);
  }

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
    // const copy_squares = this.state.squares; //copy entire square class array
    // for (let i = 0; i < this.state.board_width ** 2; i++) {
    //   const square = new square_data_class();
    //   square.value = i;
    //   square.id = i;
    //   square.square_click_handler = this.handleClick;
    //   copy_squares.push(square);
    // }
    // this.setState({ squares: copy_squares });
    // this.setRowAndColumn();

    //capture keypress
    document.addEventListener("keydown", this.keydownHandler);
  }

  // componentWillUnmount() {
  //   this.removeEventListener("keydown", this.keydownHandler);
  // }

  getSquare() {
    return this.state.squares;
  }

  loopButtons() {
    const copy_squares = this.state.squares;
    const button_array = [];
    console.log("this in loop buttons:", this);
    console.log("copy squares", copy_squares);
    console.log("squares from state", this.state.squares);
    for (let i = 0; i < this.props.board_width ** 2; i++) {
      button_array.push(
        <My_Button
          my_key={i}
          //i dont think onClick is different for each button
          my_row={copy_squares[i].row}
          my_col={copy_squares[i].col}
          onClickFunction={this.state.squares[i].square_click_handler}
        />
      );
    }
    return button_array;
  }

  render() {
    console.log("state going into render", this.state.squares);
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">{this.loopButtons()}</div>
        </header>
      </div>
    );
  }
}
class My_Button extends React.Component {
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
      <Button className="box-1" onClick={this.onClick}>
        ({this.props.my_row} , {this.props.my_col})
      </Button>
    );
  }
}

export default ReactDoku;
