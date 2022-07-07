import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  render() {
    var my_array = Array.from({ length: 16 }, (x, i) => i);
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            {my_array.map(function (count) {
              return <div className="box-1">{count}</div>;
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
