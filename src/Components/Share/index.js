import React from "react";
import { Component } from "react";
import { share as shareScreen } from "../../Services/api";
import "./style.css"

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.share = this.share.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      email: event.target.value,
    })
    this.props.handle(event.target.value)
  }

  async share() {
    //console.log("at share" , this.props)
    try {
      const done = await shareScreen(this.props.email, this.props.offset,this.props.searchTerm);
      console.log(done);
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }


  render() {
      return (
        <div className = "share">
          <input 
           type="text" 
           placeholder="Email..." 
           name="email"
           onChange={this.handleInputChange}
           className="shBtn"
           value={this.props.email}
          /> 
        <button className="shBtn" onClick={this.share}>Share search</button>
        </div>
      )
  }
}

export default Share;