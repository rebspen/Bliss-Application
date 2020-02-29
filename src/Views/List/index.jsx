import React, { Component } from "react";
// import { Link } from "react-router-dom";

class List extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("Questions", this.state.questions);

    return (
      <div className="App">
        <h1>Index</h1>
      </div>
    );
  }
}

export default List;
