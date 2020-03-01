import React from "react";
import { Component } from "react";
import "./style.css"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount(){
    const edit = this.props.searchTerm.split("=")
    this.setState({
      search: edit[1]
    })
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
    this.props.search(event.target.value)
  }
  

  render() {
      return (
        <div>
        <label>Search Questions</label>
          <input 
          className="search"
           type="text" 
           placeholder="Search..." 
           name="search"
           onChange={this.handleInputChange}
           value={this.state.search}
          /> 
        <button className="searchBtn" onClick={this.dismiss}>Dismiss</button>
        </div>
      )
  }
}

export default Search;