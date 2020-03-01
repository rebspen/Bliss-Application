import React from "react";
import { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      search: event.target.value
    })
    this.props.search(event.target.value)
  }

  dismiss(event){
    this.setState ({
      search:""
    });
    console.log("props", this.props)
    this.props.search(event.target.value)
  }
  

  render() {
      return (
        <div class = "search">
          <input 
           type="text" 
           placeholder="Search..." 
           name="search"
           onChange={this.handleInputChange}
           value={this.state.search}
          /> 
        <button onClick={this.dismiss}>Dismiss</button>
        </div>
      )
  }
}

export default Search;