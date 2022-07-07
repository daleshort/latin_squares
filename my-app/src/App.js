import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  myCallBack() {
    console.log("hey it's me, your first call back");
  }

  myPromise = new Promise((resolve, reject) => {
    resolve(console.log("I'm a sucessful promise"));
  });

  componentDidMount() {
    //simple callback
    setTimeout(this.myCallBack, 2000);

    //arrow function callback
    setTimeout(() => {
      console.log("hey I'm also a callback");
    }, 3000);

    //promise
    this.myPromise.then(() => {
      console.log("I'm the second part of the promise");
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            {/* "I'm a looped element" */}
            {Array.from({ length: 16 }, (x, i) => i).map(function (count) {
              return (
                <div className="box-1" key={count}>
                  {count}
                </div>
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
