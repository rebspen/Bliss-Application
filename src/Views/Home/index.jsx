import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("Questions", this.state.questions);

    return (
      <div className="App">
        <h1>Index</h1>
        <Link to = {"/questions"}>Question timeeeee</Link>
      </div>
    );
  }
}

export default Home;
