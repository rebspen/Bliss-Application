import React, { Component } from "react";
import { Link } from "react-router-dom";
import { health as healthCheck } from "../../Services/api";
import { list as listQuestions } from "../../Services/api";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      serverChecking: true,
      serverHealthy: false,
      questions: [],
      search: ""
    };
  }

  async componentDidMount() {
    const search = this.props.params
      .split("")
      .slice(1)
      .join("");
    console.log("split", search);
    this.setState({
      search: search
    });
    try {
      const health = await healthCheck();
      console.log("search params", this.state.search);
      if (health.status === "OK") {
        const list = await listQuestions();
        const listKeysAdded = list.map(val => {
          val.key = val.id;
          return val;
        });
        this.setState({
          serverChecking: false,
          serverHealthy: true,
          questions: listKeysAdded
        });
      } else {
        this.setState({
          serverChecking: false
        });
      }
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  // async componentDidUpdate(){
  //   try {
  //     const list = await listQuestions();
  //     if(this.state.serverHealthy){
  //       // this.setState({
  //       //  questions: list
  //       // });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.log("Error in service.");
  //   }
  // }

  render() {
    console.log(this.props.location.state);
    return (
      <div>
        <h1>details</h1>
      </div>
    );
  }
}

export default Detail;
