import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

class square_data_class {
  constructor() {
    const value = "";
    const id = "";
    const isSelected = false;
  }

  handleClick(i) {
    console.log("click from a square:" + i);
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
    console.log("click detected");

    console.log("On click" + this.props.my_key);
    console.log("key is" + this.props.my_key);
    this.props.onClickFunction(this.props.my_key);
  }

  render() {
    console.log("rendering" + this.props.my_key);
    return (
      <Button className="box-1" key={this.props.my_key} onClick={this.onClick}>
        {this.props.my_key}
      </Button>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: [new square_data_class()], keypress: "" };
  }

  keydownHandler = (event) => {
    if ("1234567890".includes(event.key)) {
      console.log("key press:" + event.key);
    }
  };

  componentDidMount() {
    const copy_square = this.state.squares;
    copy_square[0].value = "2";
    copy_square[0].id = "2";

    this.setState({ squares: copy_square });
    console.log("squares in mount:" + this.state.squares[0].value);

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
                  onClickFunction={this.state.squares[0].handleClick}
                />
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
