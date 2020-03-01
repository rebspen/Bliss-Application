import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css"

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to this list of Super Unique Questions</h1>
        <p>they are totally not just the same one</p>
        <p>promise....</p>
        <button className="qBtn">
        <Link className="link" to = {"/questions"}>Question timeeeee</Link>
        </button>
      </div>
    );
  }
}

export default Home;
