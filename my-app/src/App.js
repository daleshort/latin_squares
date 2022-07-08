import logo from "./logo.svg";
import "./App.css";
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

class App extends React.Component {
  constructor(props) {
    super(props);

    const board_cell_count = parseInt(this.props.board_width) ** 2;
    console.log("cell count:" + board_cell_count);
    this.state = {
      squares: new Array(board_cell_count).fill(new square_data_class()),
      keypress: "",
      board_width: 4,
    };
    // this.state = { squares: [new square_data_class()], keypress: "", board_width: 4, };
    this.handleClick = this.handleClick.bind(this);
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
    const copy_squares = this.state.squares; //copy entire square class array
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
    const copy_squares = this.state.squares; //copy entire square class array
    for (let i = 0; i < this.state.board_width ** 2; i++) {
      copy_squares[i].value = i;
      copy_squares[i].id = i;
      copy_squares[i].square_click_handler = this.handleClick;
    }
    this.setRowAndColumn();
    this.setState({ squares: copy_squares });

    //capture keypress
    document.addEventListener("keydown", this.keydownHandler);
  }

  // componentWillUnmount() {
  //   this.removeEventListener("keydown", this.keydownHandler);
  // }

  getSquare() {
    return this.state.squares;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            {/* "I'm a looped element" */}
            {Array.from({ length: 16 }, (x, i) => {
              return (
                <My_Button
                  my_key={i}
                  onClickFunction={this.state.squares[i].square_click_handler}
                />
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}
class My_Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = { my_key: "", onClickFunction: null };
    this.onClick = this.onClick.bind(this);
    //https://stackoverflow.com/questions/50862192/react-typeerror-cannot-read-property-props-of-undefined
  }

  componentDidMount() {
    this.setState({
      my_key: this.props.my_key,
      onClickFunction: this.props.onClickFunction,
    });

    console.log("component did mount:" + this.props.my_key);
  }

  onClick() {
    //  console.log("click detected");
    //  console.log("On click" + this.props.my_key);
    //  console.log("key is" + this.props.my_key);
    this.props.onClickFunction(this.props.my_key);
  }

  render() {
    return (
      <Button className="box-1" key={this.props.my_key} onClick={this.onClick}>
        {this.props.my_key}
      </Button>
    );
  }
}

export default App;
