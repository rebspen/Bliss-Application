import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import { load as loadBeers } from './../../services/beers';


class List extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

render() {
  return (
    <div className = "App">
    <h1>list</h1>
    </div>
    );
  }
}

export default List;
