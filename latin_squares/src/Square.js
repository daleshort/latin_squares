import React from "react";
import "./Square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", lastValue: "", my_style: "" };

    this.handleChange = this.handleChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    //do we need this bind still?  What does it do?
  }
  componentDidMount() {
    this.setState({ my_style: "outer-box double-top" });
  }

  handleChange(event) {
    //check the state of the text and see if its valid
    //if its valid let the value stay what it is
    //its not valid clear the value
    //(do we need to force the text in the text box to clear?)
    let text_received;

    console.log("event text received" + event.target.value);
    if (isNaN(event.target.value)) {
      text_received = event.target.value;
    } else if (event.target.value.length >= 2) {
      // text is "12" lastvalue is 1  -> we want 2  indexOf(last) = 0
      // text is "12" lastvalue is 2 -> we want 1   indexOf(lastValue) = 1
      // text is "21" lastvalue is 2 -> we want 1
      // text is '21' lastvalue is 1 -> we want 2

      if (event.target.value.indexOf(this.state.lastValue) == 0) {
        text_received = event.target.value.charAt(1);
      } else {
        text_received = event.target.value.charAt(0);
      }
      this.setState({ lastValue: text_received });
    } else {
      text_received = event.target.value;
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(text_received)) {
      this.setState({ value: text_received });
    } else if (text_received === "\n" || text_received === "\r") {
    } else {
      this.setState({ value: "" });
      //clear the value in the textbook
    }
    //  alert("you just typed" + text_received);
  }

  handleOnClick = (event) => {
    // this.setState({ value: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div class={this.state.my_style}>
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
      </div>
    );
  }
}
//        <input type="submit" value="Submit" />
export default Square;
