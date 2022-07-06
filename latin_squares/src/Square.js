import React from "react";
import "./Square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //check the state of the text and see if its valid
    //if its valid let the value stay what it is
    //its not valid clear the value
    //(do we need to force the text in the text box to clear?)
    let text_received;
    text_received = event.target.value;

    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(text_received)
    ) {
      this.setState({ value: text_received });
    } else if (text_received === "\n" || text_received === "\r") {
      console.log(text_received);
    } else {
      this.setState({ value: "" });
      //clear the value in the textbook
    }
    //  alert("you just typed" + text_received);
  }

  //   handleSubmit(event) {
  //     alert("A name was submitted: " + this.state.value);
  //     event.preventDefault();
  //   }

  handleOnClick = (event) => {
    this.setState({ value: "" });
  };

  handleSubmit = (event) => {
    alert("you be submitting");
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onClick={this.handleOnClick}
              onSubmit={this.handleSubmit}
              onkeydown="return event.key != 'Enter';"
              class="default-box"
            />
          </label>
        </form>
        <div>our state of value is {this.state.value}</div>
      </div>
    );
  }
}
//        <input type="submit" value="Submit" />
export default Square;
