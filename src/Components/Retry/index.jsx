import React from "react";
import { Component } from "react";
import { health as healthCheck } from "../../Services/api";

class Retry extends Component {
  constructor(props) {
    super(props);
    this.retry = this.retry.bind(this);
  }

  async retry(){
    try {
      const health = await healthCheck();
      if (health.status === "OK") {
        //console.log("okay")
        this.props.handler()
      }  
    } catch (error) {  
      console.log(error);
      console.log("Error in service.");
    }
  }
  
  render() {
    return (
     <div>
       <h1>Oops - can't reach the server</h1>
       <button onClick={this.retry}>Retry</button>
     </div>
      )
    }
  }
  
  export default Retry;