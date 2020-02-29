import React, { Component } from "react";
import { Link } from "react-router-dom";
import { health as healthCheck } from "../../Services/api";
import { list as listQuestions } from "../../Services/api";
import Question from "../../Components/Single";

class Home extends Component {
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
    const search = this.props.location.search
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
        const list = await listQuestions(this.state.search);
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
    console.log(this.state.serverChecking);
    console.log(this.state.serverHealthy);
    console.log("Questions", this.state.questions);
    const questions = this.state.questions;
    console.log("search", this.state.search);
    const ans = this.state.search.split("=");
    const route = !ans[1] ? "main" : ans[1];
    console.log("route", ans, route);

    return (
      <div>
        <h1>list</h1>
        {this.state.serverChecking && <h3>Checking Server Health</h3>}
        {this.state.serverHealthy && (
          <div>
            {questions.map(val => {
              return (
                <div>
                  <img src={val.thumb_url} />
                  <p>
                    {val.id}. {val.question}
                  </p>
                  <Link
                    to={{
                      pathname: `/details/${route}/${val.id}`,
                      state: {
                        question: val
                      }
                    }}
                  >
                    See details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
