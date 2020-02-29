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
      question: [],
      search: "",
      multiple: true,
      single: false
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async componentDidMount() {
    let search = this.props.location.search
      .split("")
      .slice(1)
      .join("");
    if (parseInt(search)) {
      search = parseInt(search);
    }
    this.setState({
      search: search
    });
    try {
      const health = await healthCheck();
      if (health.status === "OK") {
        const list = await listQuestions(this.state.search);
        console.log("API RETURNS", list);
        if (!list.length) {
          this.setState({
            serverChecking: false,
            serverHealthy: true,
            multiple: false,
            single: true,
            questions: list
          });
        } else {
          this.setState({
            serverChecking: false,
            serverHealthy: true,
            questions: list,
            multiple: true,
            single: false
          });
        }
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

  async updateSearch(id) {
    const search = id;
    console.log("apples", search);
    this.setState({
      search: search
    });
    try {
      const list = await listQuestions(search);
      this.setState({
        questions: list,
        multiple: false,
        single: true
      });
      console.log("got the new questions");
    } catch (error) {
      console.log(error);
      console.log("Error in service.");
    }
  }

  render() {
    const questions = this.state.questions;
    console.log("questions", questions);
    console.log("single?", this.state.single);
    return (
      <div>
        <h1>list</h1>
        {this.state.serverChecking && <h3>Checking Server Health</h3>}
        {this.state.serverHealthy && this.state.multiple && (
          <div>
            {questions.map(val => {
              return (
                <div>
                  <img src={val.thumb_url} />
                  <p>
                    {val.id}. {val.question}
                  </p>
                  <button onClick={() => this.updateSearch(val.id)}>
                    <Link to={`/questions?${val.id}`}>See details</Link>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {this.state.single && (
          <div>
            {" "}
            <img src={questions.image_url} />{" "}
            <p>
              {questions.id} {questions.question}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
