import React from "react";
import { Component } from "react";
import { share as shareScreen } from "../../Services/api";

class Share extends Component {
  constructor(props) {
    super(props);
    console.log("grapeeee", this.props)
    this.state = {
      email:""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.share = this.share.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      email: event.target.value
    })
    this.props.search(event.target.value)
  }

  async share() {
    try {
      const done = await shareScreen(this.search);
      console.log(done, this.search);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }


  render() {
      return (
        <div class = "search">
          <input 
           type="text" 
           placeholder="Email..." 
           name="email"
           onChange={this.handleInputChange}
          /> 
        <button onClick={this.share}>Share search</button>
        </div>
      )
  }
}

export default Share;